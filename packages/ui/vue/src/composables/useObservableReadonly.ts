import { type ObservableReadonly, DisposeToken, ReadonlyRefValueChangeException } from '@client/shared';
import { customRef } from 'vue';
import type { Ref } from 'vue';
import { useService } from './useService';

export function useObservableReadonly<T>(observable: ObservableReadonly<T>): Ref<T>
{
    const disposeToken = useService(DisposeToken);

    const ref = customRef<T>((track, trigger) =>
    {
        observable.on(() =>
        {
            trigger();
        }, disposeToken);

        return {
            get()
            {
                track();
                return observable.value;
            },

            set()
            {
                throw new ReadonlyRefValueChangeException();
            },
        };
    });

    return ref;
}
