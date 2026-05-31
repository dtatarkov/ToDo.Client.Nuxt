import { Button } from './button';
import type { Action } from '@/modules/shared/types/action';
import { HandlerWrapper } from '@/modules/shared/entities/handlerWrapper';

export abstract class ButtonBase extends Button
{
    protected clickHandler = new HandlerWrapper();

    override setClickHandler(handler: Action): void
    {
        this.clickHandler.setHandler(handler);
    }
}