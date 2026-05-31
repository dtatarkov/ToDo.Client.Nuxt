import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ButtonIcon } from './buttonIcon';
import { ButtonBase } from './buttonBase';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import VButtonIcon from '@/modules/uikit/components/VButtonIcon.vue';
import { useObservable } from '@/modules/shared/composables/useObservable';

export class ButtonIconBase extends ButtonBase implements ButtonIcon
{
    protected readonly data = new ObservableSource({
        isDisabled: false,
        icon: ''
    });

    readonly key = getUniqueId('button-element-icon');

    readonly component = {
        setup: () =>
        {
            const data = useObservable(this.data);

            const onClick = () =>
            {
                this.clickHandler.handle();
            };

            return () => h(VButtonIcon, {
                ...data.value,

                onClick
            });
        }
    };

    get icon(): string
    {
        return this.data.value.icon;
    }

    set icon(value: string)
    {
        this.data.mutate({ icon: value });
    }

    get isDisabled(): boolean
    {
        return this.data.value.isDisabled;
    }

    set isDisabled(value: boolean)
    {
        this.data.mutate({ isDisabled: value });
    }
}