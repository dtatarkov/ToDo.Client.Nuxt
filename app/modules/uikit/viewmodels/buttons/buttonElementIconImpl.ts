import { ButtonElementIcon } from "../../interfaces/buttonElementIcon";
import type { ButtonElementColor } from '../../types/buttonElementColor';
import { ButtonElementBaseImpl } from './buttonElementBaseImpl';

export class ButtonElementIconImpl extends ButtonElementBaseImpl implements ButtonElementIcon
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
            color: <ButtonElementColor>'secondary',
            size: 'sm',
            class: `${baseProps.class} hover:text-primary`
        };

        return props;
    }
}

