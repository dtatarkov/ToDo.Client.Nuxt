import { customRef } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { ReadonlyRefValueChangeException } from '@/modules/shared/exceptions/readonlyRefValueChangeException';
import type { Action } from '@/modules/shared/types/action';
import type { Ref } from 'vue';
import type { Func } from '@/modules/shared/types/func';

export type UseEventDrivenRefConfiguration<T> = {
    getter: Func<T>,
    setter?: Action<[T]>;
    on: Action<[Action, DisposeToken]>;
};

export function useEventDrivenRef<T>(configuration: UseEventDrivenRefConfiguration<T>): Ref<T>
{
    const { getter, setter, on } = configuration;

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

            set(value)
            {
                if (!setter)
                {
                    throw new ReadonlyRefValueChangeException();
                }

                setter(value);
            },
        };
    });

    return ref;
}
