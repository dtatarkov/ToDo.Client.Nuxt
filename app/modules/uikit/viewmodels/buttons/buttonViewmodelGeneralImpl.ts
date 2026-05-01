import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { ButtonGeneralViewmodel } from "../../interfaces/buttonGeneralViewmodel";
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
            this.click.emit();
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

    get isDisabled(): boolean
    {
        this.destroyToken.assertNotDestroyed();
        return this.props.disabled;
    }

    set isDisabled(value: boolean)
    {
        this.destroyToken.assertNotDestroyed();
        this.props.disabled = value;
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
}