import { DestroyTokenBase } from '@/modules/shared/entities/destroyTokenBase';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { ButtonViewmodelBase as ButtonViewmodelBase } from '../../interfaces/buttonViewmodelBase';
import type { Action } from '@/modules/shared/types/action';
import type { ButtonViewmodelColor } from '../../types/buttonViewmodelColor';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { UButton } from '#components';

type ButtonViewmodelProps = {
    label: string;
    color: ButtonViewmodelColor;
    variant: string;
    size: string;
    disabled: boolean;
    loading: boolean;
    class: string;
    icon: string;

    onClick: Action;
};

export abstract class ButtonViewmodelBaseImpl extends ButtonViewmodelBase
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

    protected createProps(): ButtonViewmodelProps
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
