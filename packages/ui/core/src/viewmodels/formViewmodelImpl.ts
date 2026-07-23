import { FormDisabledException } from '../exceptions/formDisabledException';
import type { FormElement } from '../entities/formElement';
import type { FormElementsFactory } from '../factories/formElementsFactory';
import { FormValidationError } from '../entities/formValidationError';
import type { FormElementValidationError } from '../entities/formElementValidationError';
import { type Func, EntityEvent, type AsyncCommand, type Action, type DisposeToken, AsyncCommandBase, toObject } from '@client/shared';
import { ObservableWritableBase } from '@client/shared';
import type { FormViewmodelState } from '../types/formViewmodelState';
import type { FormConfiguration } from '../types/formConfiguration';
import type { FormHandlers } from '../types/formHandlers';
import { FormViewmodel } from './formViewmodel';
import { ViewmodelBase } from './viewmodelBase';

export class FormViewmodelImpl<TEntity extends Record<string, any>> extends ViewmodelBase<FormViewmodelState<TEntity>> implements FormViewmodel<TEntity>
{
    private submitCommand: AsyncCommand;

    private validationErrorEvent = new EntityEvent<FormValidationError>();
    private elements = new Array<FormElement>();

    state: ObservableWritableBase<FormViewmodelState<TEntity>>;

    constructor(
        private formElementsFactory: FormElementsFactory,
        configuration: FormConfiguration<TEntity>,
        handlers: FormHandlers<TEntity>,
    )
    {
        super();

        this.elements = this.formElementsFactory.createElements(configuration.elements);

        this.state = new ObservableWritableBase<FormViewmodelState<TEntity>>({
            elements: configuration.elements,
            data: this.getData(),
            isDisabled: false,
        });

        this.submitCommand = this.createSubmitCommand(handlers.submit);
    }

    getData(): Record<keyof TEntity, any>
    {
        const data: Record<string, any> = {};

        for (const element of this.elements)
        {
            data[element.name] = element.value;
        }

        return data as Record<keyof TEntity, any>;
    }

    setData(changeData: Partial<Record<keyof TEntity, any>>)
    {
        this.assertNotDisabled();
        this.setElementsValue(changeData);

        const newData = this.getData();

        this.updateState({ data: newData });
    }

    getSubmitCommand(): AsyncCommand
    {
        return this.submitCommand;
    }

    onValidationError(handler: Action<[FormValidationError]>, token?: DisposeToken): void
    {
        this.validationErrorEvent.on(handler, token);
    }

    override[Symbol.dispose](): void
    {
        super[Symbol.dispose]();

        this.validationErrorEvent[Symbol.dispose]();

        this.elements.forEach(element =>
            element[Symbol.dispose]());

        this.elements = [];
    }

    private setElementsValue(data: Partial<Record<keyof TEntity, any>>)
    {
        for (const element of this.elements)
        {
            if (element.name in data)
            {
                element.value = data[element.name];
            }

            else
            {
                element.setDefaultValue();
            }
        }
    }

    private validate(): void
    {
        this.elements.forEach(element =>
            element.validate());

        const elementValidationErrors = this.getElementValidationErrors();
        const errors = toObject(elementValidationErrors, error => error.formElementName as keyof TEntity);

        this.updateState({
            errors
        });
    }

    private isValid(): boolean
    {
        const isValid = this.elements.every(element => element.isValid());

        return isValid;
    }

    private isDisabled(): boolean
    {
        return this.state.value.isDisabled;
    }

    private disable(): void
    {
        this.assertNotDisabled();

        this.elements.forEach(element =>
            element.disable());

        this.updateState({
            isDisabled: true
        });
    }

    private enable(): void
    {
        if (!this.isDisabled())
        {
            return;
        }

        this.elements.forEach(element =>
            element.enable());

        this.updateState({
            isDisabled: false
        });
    }

    private assertNotDisabled(): void
    {
        if (this.isDisabled())
        {
            throw new FormDisabledException();
        }
    }

    private createSubmitCommand(submitFn: Func<Promise<void>, [Record<keyof TEntity, any>]>)
    {
        const command = new AsyncCommandBase(async () =>
        {
            this.assertNotDisabled();
            this.validate();

            if (!this.isValid())
            {
                this.emitFormValidationError();

                return false;
            }

            this.disable();

            try
            {
                const data = this.getData();
                await submitFn(data);

                return true;
            }
            finally
            {
                this.enable();
            }
        });

        return command;
    }

    private getFormValidationError(): FormValidationError | undefined
    {
        const elementValidationErrors = this.getElementValidationErrors();

        if (elementValidationErrors.length === 0)
        {
            return undefined;
        }

        const formValidationError = new FormValidationError(elementValidationErrors);

        return formValidationError;
    }

    private getElementValidationErrors()
    {
        return this.elements.reduce((result, element) =>
        {
            const error = element.getError();

            if (error)
            {
                result.push(error);
            }

            return result;
        }, new Array<FormElementValidationError>());
    }

    private emitFormValidationError(): void
    {
        const formValidationError = this.getFormValidationError();

        if (formValidationError)
        {
            this.validationErrorEvent.emit(formValidationError);
        }
    }
}
