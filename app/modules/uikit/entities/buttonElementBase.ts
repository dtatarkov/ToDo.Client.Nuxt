import { UButton } from "#components";
import { ButtonElement } from "../interfaces/buttonElement";
import type { ButtonElementColor } from '../types/buttonElementColor';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';

export class ButtonElementBase extends ButtonElement
{
    protected readonly props = reactive({
        label: '',
        color: <ButtonElementColor>'neutral',
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

    get color(): ButtonElementColor
    {
        return this.props.color;
    }

    set color(value: ButtonElementColor)
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
}