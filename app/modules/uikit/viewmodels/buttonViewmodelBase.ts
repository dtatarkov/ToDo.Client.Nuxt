import { UButton } from "#components";
import { ButtonViewmodel } from "../interfaces/buttonViewmodel";
import type { ButtonViewmodelColor } from '../types/buttonViewmodelColor';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export class ButtonViewmodelBase extends ButtonViewmodel
{
    protected readonly props = reactive({
        label: '',
        color: <ButtonViewmodelColor>'neutral',
        variant: 'outline',
        disabled: false,
        loading: false,
        class: 'cursor-pointer',

        onClick: () =>
        {
            this.click.emit();
        },
    });

    readonly key = getUniqueId('button-element');

    readonly component = {
        setup: () =>
        {
            return () => h(<any>UButton, this.props);
        }
    };

    readonly click = new EventBusBase();

    get title(): string
    {
        return this.props.label;
    }

    set title(value: string)
    {
        this.props.label = value;
    }

    get color(): ButtonViewmodelColor
    {
        return this.props.color;
    }

    set color(value: ButtonViewmodelColor)
    {
        this.props.color = value;
    }

    get isDisabled(): boolean
    {
        return this.props.disabled;
    }

    set isDisabled(value: boolean)
    {
        this.props.disabled = value;
    }

    get isLoading(): boolean
    {
        return this.props.loading;
    }

    set isLoading(value: boolean)
    {
        this.props.loading = value;
    }

    override destroy(): void
    {
        this.click.destroy();
    }
}