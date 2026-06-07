import { Button, type ButtonCallbacks } from './button';
import { callbacksWrapper } from '@/modules/shared/entities/callbacksWrapper';

export abstract class ButtonBase extends Button
{
    protected callbacks = callbacksWrapper<ButtonCallbacks>();

    override on(callbacks: Partial<ButtonCallbacks>): void
    {
        this.callbacks(callbacks);
    }
}