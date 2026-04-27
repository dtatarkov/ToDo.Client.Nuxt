import { ButtonViewmodelGeneral } from "../../interfaces/buttonViewmodelGeneral";
import type { ButtonViewmodelColor } from '../../types/buttonViewmodelColor';
import { ButtonViewmodelBaseImpl } from './buttonViewmodelBaseImpl';

export class ButtonViewmodelGeneralImpl extends ButtonViewmodelBaseImpl implements ButtonViewmodelGeneral
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

    get color(): ButtonViewmodelColor
    {
        this.destroyToken.assertNotDestroyed();
        return this.props.color;
    }

    set color(value: ButtonViewmodelColor)
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