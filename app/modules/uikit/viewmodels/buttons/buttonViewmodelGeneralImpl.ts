import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonGeneralViewmodel } from "../../interfaces/buttonGeneralViewmodel";
import type { ButtonViewmodelColor } from '../../types/buttonViewmodelColor';
import { ButtonViewmodelBaseImpl } from './buttonViewmodelBaseImpl';
import { UButton } from '#components';

export class ButtonViewmodelGeneralImpl extends ButtonViewmodelBaseImpl implements ButtonGeneralViewmodel
{
    protected readonly props = reactive({
        label: '',
        color: <ButtonViewmodelColor>'neutral',
        variant: 'outline',
        size: 'lg',
        disabled: false,
        loading: false,
        class: 'cursor-pointer',

        onClick: () =>
        {
            this.clickHandler.handle();
        },
    });

    readonly key = getUniqueId('button-element-general');

    readonly component = {
        setup: () =>
        {
            return () => h(<any>UButton, this.props);
        }
    };

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
}