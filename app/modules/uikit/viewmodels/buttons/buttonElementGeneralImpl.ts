import { ButtonElementGeneral } from "../../interfaces/buttonElementGeneral";
import type { ButtonElementColor } from '../../types/buttonElementColor';
import { ButtonElementBaseImpl } from './buttonElementBaseImpl';

export class ButtonElementGeneralImpl extends ButtonElementBaseImpl implements ButtonElementGeneral
{
    get title(): string
    {
        this.destroyToken.assertNotDestroyed();
        return this.props.label;
    }

    set title(value: string)
    {
        this.destroyToken.assertNotDestroyed();
        this.props.label = value;
    }

    get color(): ButtonElementColor
    {
        this.destroyToken.assertNotDestroyed();
        return this.props.color;
    }

    set color(value: ButtonElementColor)
    {
        this.destroyToken.assertNotDestroyed();
        this.props.color = value;
    }

    get isLoading(): boolean
    {
        this.destroyToken.assertNotDestroyed();
        return this.props.loading;
    }

    set isLoading(value: boolean)
    {
        this.destroyToken.assertNotDestroyed();
        this.props.loading = value;
    }

    protected override createProps()
    {
        return {
            ...super.createProps(),

            size: 'lg'
        };
    }
}