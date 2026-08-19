import { type AsyncCommand, type Action, DisposeToken, onMany } from '@client/shared';
import { ObservableViewmodelState, ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { FormHandlers } from '../types/formHandlers';
import type { FormValidationMessages } from '../types/formValidationMessages';
import { FormViewmodel } from './formViewmodel';
import { FormDataContextBase } from '../entities/formDataContextBase';
import { FormLockBase } from '../entities/formLockBase';
import { FormValidatorBase } from '../entities/formValidatorBase';
import { FormEventsBase } from '../entities/formEventsBase';
import { AsyncCommandFormSubmit } from '../commands/asyncCommandFormSubmit';
import type { FormElementViewmodel } from './formElementViewmodel';
import type { FormDataContext } from '../entities/formDataContext';
import type { FormEvents } from '../entities/formEvents';
import type { FormLock } from '../entities/formLock';
import type { FormValidator } from '../entities/formValidator';
import type { FormData } from '../types/formData';

export class FormViewmodelImpl<TEntity extends Record<string, any>> extends ViewmodelBase<FormData> implements FormViewmodel<TEntity>
{
    private submitCommand: AsyncCommand;
    private formDataContext: FormDataContext<TEntity>;
    private formLock: FormLock;
    private formValidator: FormValidator<TEntity>;
    private formEvents: FormEvents<TEntity>;

    state: ObservableViewmodelState<FormData>;

    constructor(
        private elementViewmodels: FormElementViewmodel<any>[],
        handlers: FormHandlers<TEntity>,
        scheme?: EntityScheme<any, TEntity>,
    )
    {
        super();

        this.state = new ObservableViewmodelStateBase<FormData>({
            elements: [],
            isDisabled: false,
        });

        this.formDataContext = new FormDataContextBase<TEntity>(this.elementViewmodels, this.state);
        this.formLock = new FormLockBase(this.elementViewmodels, this.state);
        this.formValidator = new FormValidatorBase<TEntity>(this.elementViewmodels, this.formDataContext, scheme);

        this.formEvents = new FormEventsBase<TEntity>();
        this.disposeToken.registerDisposable(this.formEvents);

        this.submitCommand = new AsyncCommandFormSubmit(
            this.formDataContext,
            this.formLock,
            this.formValidator,
            this.formEvents,
            handlers.submit
        );

        this.initState();
        this.watchElementViewmodels();
    }

    private initState()
    {
        this.state.update({
            elements: this.getElementsState(),
        });
    }

    private watchElementViewmodels()
    {
        const elementStates = this.elementViewmodels.map(vm => vm.state);

        onMany(elementStates, () =>
        {
            this.getElementsState();
        });
    }

    getData(): Record<keyof TEntity, any>
    {
        return this.formDataContext.getData();
    }

    setData(changeData: Partial<Record<keyof TEntity, any>>)
    {
        this.formLock.assertNotDisabled();
        this.formDataContext.setData(changeData);
    }

    getSubmitCommand(): AsyncCommand
    {
        return this.submitCommand;
    }

    async submitAsync(): Promise<void>
    {
        await this.submitCommand.executeAsync();
    }

    onValidationError(handler: Action<[FormValidationMessages<TEntity>]>, token?: DisposeToken): void
    {
        this.formEvents.formValidationErrorEvent.on(handler, token);
    }

    private getElementsState()
    {
        const elements = this.elementViewmodels.map(vm => vm.state.value);

        return elements;
    }
}
