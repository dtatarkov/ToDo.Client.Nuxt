import { HandlerWrapper } from '@/modules/shared/entities/handlerWrapper';
import type { Action } from '@/modules/shared/types/action';
import type { Func } from '@/modules/shared/types/func';
import { UIElementAction, UIElementActionState } from './uiElementAction';

export class UIElementActionBase extends UIElementAction
{
    private actionStateInternal = shallowRef(UIElementActionState.idle);
    private actionStateChangeHandler = new HandlerWrapper<[UIElementActionState]>();

    get actionState(): UIElementActionState
    {
        return this.actionStateInternal.value;
    }

    constructor(
        private executeAsyncInternal: Func<Promise<void>>
    )
    {
        super();
    }

    async executeAsync(): Promise<void>
    {
        if (this.actionState != UIElementActionState.idle)
        {
            return;
        }

        this.setActionState(UIElementActionState.processing);

        try
        {
            await this.executeAsyncInternal();

            this.setActionState(UIElementActionState.finishedProcessing);
        }
        catch (ex)
        {
            this.setActionState(UIElementActionState.idle);
            throw ex;
        }
    }

    setActionStateChangeHandler(handler: Action<[UIElementActionState]>): void
    {
        this.actionStateChangeHandler.setHandler(handler);
    }

    destroy()
    {
        this.actionStateChangeHandler.destroy();
    }

    private setActionState(state: UIElementActionState): void
    {
        if (this.actionStateInternal.value !== state)
        {
            this.actionStateInternal.value = state;
            this.actionStateChangeHandler.handle(state);
        }
    }
}
