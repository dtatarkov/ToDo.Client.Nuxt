import { customRef } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { ReadonlyRefValueChangeException } from '@/modules/shared/exceptions/readonlyRefValueChangeException';
import type { Action } from '@/modules/shared/types/action';
import type { Ref } from 'vue';

export function useEventDrivenRef<T>(
    getter: () => T,
    on: (callback: Action<[]>, disposeToken: DisposeToken) => void,
): Ref<T>
{
    const disposeToken = useService(DisposeToken);

    const ref = customRef<T>((track, trigger) =>
    {
        on(() =>
        {
            trigger();
        }, disposeToken);

        return {
            get()
            {
                track();
                return getter();
            },

            set()
            {
                throw new ReadonlyRefValueChangeException();
            },
        };
    });

    return ref;
}