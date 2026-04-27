import { ButtonViewmodelIcon } from "../../interfaces/buttonViewmodelIcon";
import type { ButtonViewmodelColor } from '../../types/buttonViewmodelColor';
import { ButtonViewmodelBaseImpl } from './buttonViewmodelBaseImpl';

export class ButtonViewmodelIconImpl extends ButtonViewmodelBaseImpl implements ButtonViewmodelIcon
{
    get icon(): string
    {
        this.destroyToken.assertNotDestroyed();
        return this.props.icon;
    }

    set icon(value: string)
    {
        this.destroyToken.assertNotDestroyed();
        this.props.icon = value;
    }

    protected override createProps()
    {
        const baseProps = super.createProps();

        const props = {
            ...baseProps,

            variant: 'link',
            color: <ButtonViewmodelColor>'secondary',
            size: 'sm',
            class: `${baseProps.class} hover:text-primary`
        };

        return props;
    }
}

