import { DestroyTokenBase } from '@/modules/shared/entities/destroyTokenBase';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { ButtonElementBase } from '../../interfaces/buttonElementBase';
import type { Action } from '@/modules/shared/types/action';
import type { ButtonElementColor } from '../../types/buttonElementColor';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { UButton } from '#components';

type ButtonElementProps = {
    label: string;
    color: ButtonElementColor;
    variant: string;
    size: string;
    disabled: boolean;
    loading: boolean;
    class: string;
    icon: string;

    onClick: Action;
};

export abstract class ButtonElementBaseImpl extends ButtonElementBase
{
    protected destroyToken = new DestroyTokenBase();
    protected readonly props = reactive(this.createProps());

    readonly key = getUniqueId('button-element');

    readonly component = {
        setup: () =>
        {
            return () => h(<any>UButton, this.props);
        }
    };

    readonly click = new EventBusBase();

    get isDisabled(): boolean
    {
        this.destroyToken.assertNotDestroyed();
        return this.props.disabled;
    }

    set isDisabled(value: boolean)
    {
        this.destroyToken.assertNotDestroyed();
        this.props.disabled = value;
    }

    override destroy(): void
    {
        if (this.destroyToken.isDestroyed)
        {
            return;
        }

        this.click.destroy();
        this.destroyToken.destroy();
    }

    protected createProps(): ButtonElementProps
    {
        return {
            label: '',
            color: 'neutral',
            variant: 'outline',
            size: 'md',
            disabled: false,
            loading: false,
            class: 'cursor-pointer',
            icon: '',

            onClick: () =>
            {
                this.click.emit();
            },
        };
    }
}
