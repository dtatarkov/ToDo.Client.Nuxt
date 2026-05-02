import { ButtonBaseViewmodel as ButtonBaseViewmodel, type ButtonBaseViewmodelHandlers } from '../../interfaces/buttonBaseViewmodel';
import type { Action } from '@/modules/shared/types/action';
import { HandlerWrapper } from '@/modules/shared/entities/handlerWrapper';

export abstract class ButtonViewmodelBaseImpl extends ButtonBaseViewmodel
{
    protected clickHandler = new HandlerWrapper();

    override setClickHandler(handler: Action): void
    {
        this.clickHandler.setHandler(handler);
    }

    override applyHandlers(handlers: Partial<ButtonBaseViewmodelHandlers>): void
    {
        if (handlers.click)
        {
            this.setClickHandler(handlers.click);
        }
    }
}
