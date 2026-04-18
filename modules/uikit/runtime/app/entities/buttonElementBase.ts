import { UButton } from "#components";
import { ButtonElement } from "../interfaces/buttonElement";

export class ButtonElementBase extends ButtonElement
{
    protected readonly props = reactive({
        title: '',
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
        return this.props.title;
    }

    set title(value: string)
    {
        this.props.title = value;
    }
}