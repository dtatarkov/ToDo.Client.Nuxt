import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonGeneralViewmodel } from "../../interfaces/buttonGeneralViewmodel";
import type { ButtonViewmodelColor } from '../../types/buttonViewmodelColor';
import { ButtonBaseViewmodelImpl } from './buttonBaseViewmodelImpl';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import VButtonGeneral from '@/modules/uikit/components/VButtonGeneral.vue';
import { useObservable } from '@/modules/shared/composables/useObservable';

export class ButtonGeneralViewmodelImpl extends ButtonBaseViewmodelImpl implements ButtonGeneralViewmodel
{
    protected readonly data = new ObservableSource({
        title: '',
        color: <ButtonViewmodelColor>'neutral',
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

    get color(): ButtonViewmodelColor
    {
        return this.data.value.color;
    }

    set color(value: ButtonViewmodelColor)
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