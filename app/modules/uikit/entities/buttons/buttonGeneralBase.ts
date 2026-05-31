import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonGeneral } from './buttonGeneral';
import type { Color } from '../../types/color';
import { ButtonBase } from './buttonBase';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import { useObservable } from '@/modules/shared/composables/useObservable';

export class ButtonGeneralBase extends ButtonBase implements ButtonGeneral
{
    protected readonly data = new ObservableSource({
        title: '',
        color: <Color>'neutral',
        isDisabled: false,
        isLoading: false,
    });

    readonly key = getUniqueId('button-element-general');

    readonly component = {
        setup: () =>
        {
            const data = useObservable(this.data);

            const onClick = () =>
            {
                this.clickHandler.handle();
            };

            return () => h(VButtonGeneral, {
                ...data.value,

                onClick
            });
        }
    };

    get title(): string
    {
        return this.data.value.title;
    }

    set title(value: string)
    {
        this.data.mutate({ title: value });
    }

    get color(): Color
    {
        return this.data.value.color;
    }

    set color(value: Color)
    {
        this.data.mutate({ color: value });
    }

    get isDisabled(): boolean
    {
        return this.data.value.isDisabled;
    }

    set isDisabled(value: boolean)
    {
        this.data.mutate({ isDisabled: value });
    }

    get isLoading(): boolean
    {
        return this.data.value.isLoading;
    }

    set isLoading(value: boolean)
    {
        this.data.mutate({ isLoading: value });
    }
}