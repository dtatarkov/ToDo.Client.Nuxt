import { type Func, type Action, DisposeToken, ReadonlyRefValueChangeException } from '@client/shared';
import { customRef, type Ref } from 'vue';
import { useService } from './useService';

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
