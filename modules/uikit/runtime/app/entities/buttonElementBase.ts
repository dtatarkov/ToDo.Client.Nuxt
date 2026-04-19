import { UButton } from "#components";
import { ButtonElement } from "../interfaces/buttonElement";

export class ButtonElementBase extends ButtonElement
{
    protected readonly props = reactive({
        label: '',
        color: <ButtonElementColor>'neutral',
        variant: 'outline',
        class: 'cursor-pointer',
        onClick: () => this.click.emit(),
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
}