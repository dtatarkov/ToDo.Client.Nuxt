import { customRef } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { ObservableReadonly } from '@/modules/shared/entities/observableReadonly';
import type { Ref } from 'vue';
import { ReadonlyRefValueChangeException } from '../exceptions/readonlyRefValueChangeException';

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