import type { FormElementsFactory } from '../factories/formElementsFactory';
import { FormValidationError } from '../entities/formValidationError';
import { type Func, type AsyncCommand, type Action, type DisposeToken, AsyncCommandBase } from '@client/shared';
import { ObservableViewmodelState, ObservableViewmodelStateBase } from '@client/ui-core';
import type { FormViewmodelState } from '../types/formViewmodelState';
import type { FormConfiguration } from '../configuration/formConfiguration';
import type { FormHandlers } from '../types/formHandlers';
import { FormViewmodel } from './formViewmodel';
import { FormDataContext } from '../entities/formDataContext';
import { FormLock } from '../entities/formLock';
import { FormValidator } from '../entities/formValidator';
import { FormEvents } from '../entities/formEvents';

export class FormViewmodelImpl<TEntity extends Record<string, any>> extends FormViewmodel<TEntity>
{
    private submitCommand: AsyncCommand;

    private formDataContext: FormDataContext<TEntity>;
    private formLock: FormLock<TEntity>;
    private formValidator: FormValidator;
    private formEvents: FormEvents;

    state: ObservableViewmodelState<FormViewmodelState<TEntity>>;

    constructor(
        private formElementsFactory: FormElementsFactory,
        configuration: FormConfiguration<TEntity>,
        handlers: FormHandlers<TEntity>,
    )
    {
        super();

        const elements = this.formElementsFactory.createElements(configuration.elements);

        this.state = new ObservableViewmodelStateBase<FormViewmodelState<TEntity>>({
            elements: configuration.elements,
            isDisabled: false,
        });


        this.formDataContext = new FormDataContext(elements, this.state);
        this.formLock = new FormLock(elements, this.state);
        this.formValidator = new FormValidator(elements, this.state);
        this.formEvents = new FormEvents();

        this.submitCommand = this.createSubmitCommand(handlers.submit);

        this.state.update({
            data: this.getData()
        });
    }

    override getData(): Record<keyof TEntity, any>
    {
        return this.formDataContext.getData();
    }

    override setData(changeData: Partial<Record<keyof TEntity, any>>)
    {
        this.formLock.assertNotDisabled();
        this.formDataContext.setData(changeData);
    }

    override getSubmitCommand(): AsyncCommand
    {
        return this.submitCommand;
    }

    override onValidationError(handler: Action<[FormValidationError]>, token?: DisposeToken): void
    {
        this.formEvents.formValidationErrorEvent.on(handler, token);
    }

    override[Symbol.dispose](): void
    {
        super[Symbol.dispose]();

        this.formEvents.formValidationErrorEvent[Symbol.dispose]();
    }

    private createSubmitCommand(submitFn: Func<Promise<void>, [Record<keyof TEntity, any>]>)
    {
        const command = new AsyncCommandBase(async () =>
        {
            this.formLock.assertNotDisabled();
            this.formValidator.validate();

            if (!this.formValidator.isValid() && this.formValidator.validationError)
            {
                this.formEvents.formValidationErrorEvent.emit(this.formValidator.validationError);
                return false;
            }

            this.formLock.disable();

            try
            {
                const data = this.formDataContext.getData();
                await submitFn(data);

                return true;
            }
            finally
            {
                this.formLock.enable();
            }
        });

        return command;
    }
}
