import type { FormElementsFactory } from '../factories/formElementsFactory';
import { FormValidationError } from '../entities/formValidationError';
import { type AsyncCommand, type Action, type DisposeToken } from '@client/shared';
import { ObservableViewmodelState, ObservableViewmodelStateBase } from '@client/ui-core';
import type { FormViewmodelState } from '../types/formViewmodelState';
import type { FormConfiguration } from '../configuration/formConfiguration';
import type { FormHandlers } from '../types/formHandlers';
import { FormViewmodel } from './formViewmodel';
import { FormDataContextBase } from '../entities/formDataContextBase';
import { FormLockBase } from '../entities/formLockBase';
import { FormValidatorBase } from '../entities/formValidatorBase';
import { FormEventsBase } from '../entities/formEventsBase';
import { AsyncCommandFormSubmit } from '../commands/asyncCommandFormSubmit';
import type { FormEvents } from '../entities/formEvents';
import type { FormDataContext } from '../entities/formDataContext';
import type { FormLock } from '../entities/formLock';
import type { FormValidator } from '../entities/formValidator';

export class FormViewmodelImpl<TEntity extends Record<string, any>> extends FormViewmodel<TEntity>
{
    private submitCommand: AsyncCommand;

    private formDataContext: FormDataContext<TEntity>;
    private formLock: FormLock;
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


        this.formDataContext = new FormDataContextBase(elements, this.state);
        this.formLock = new FormLockBase(elements, this.state);
        this.formValidator = new FormValidatorBase(elements, this.state);
        this.formEvents = new FormEventsBase();

        this.submitCommand = new AsyncCommandFormSubmit(
            this.formDataContext,
            this.formLock,
            this.formValidator,
            this.formEvents,
            handlers.submit
        );

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
}
