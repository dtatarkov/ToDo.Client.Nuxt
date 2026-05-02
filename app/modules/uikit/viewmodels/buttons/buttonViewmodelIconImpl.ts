import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { ButtonIconViewmodel } from "../../interfaces/buttonIconViewmodel";
import type { ButtonViewmodelColor } from '../../types/buttonViewmodelColor';
import { ButtonViewmodelBaseImpl } from './buttonViewmodelBaseImpl';
import { UButton } from '#components';

export class ButtonViewmodelIconImpl extends ButtonViewmodelBaseImpl implements ButtonIconViewmodel
{
    protected readonly props = reactive({
        color: <ButtonViewmodelColor>'secondary',
        variant: 'link',
        size: 'sm',
        disabled: false,
        class: 'cursor-pointer hover:text-primary',
        icon: '',

        onClick: () =>
        {
            this.clickHandler.handle();
        },
    });

    readonly key = getUniqueId('button-element-icon');

    readonly component = {
        setup: () =>
        {
            return () => h(<any>UButton, this.props);
        }
    };

    get icon(): string
    {
        return this.props.icon;
    }

    set icon(value: string)
    {
        this.props.icon = value;
    }

    get isDisabled(): boolean
    {
        return this.props.disabled;
    }

    set isDisabled(value: boolean)
    {
        this.props.disabled = value;
    }
}

