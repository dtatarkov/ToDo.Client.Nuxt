import type { ObservableWritable } from '../interfaces/observableWritable';
import { isObject } from '../utils/isObject';
import { shallowRef } from 'vue';
import { ObservableVue } from './internal/observableVue';

export class ObservableSource<T> extends ObservableVue<T> implements ObservableWritable<T>
{
    protected readonly ref: Ref<T>;

    get value(): T
    {
        this.destroyToken.assertNotDestroyed();

        return this.ref.value;
    }

    set value(value: T)
    {
        this.destroyToken.assertNotDestroyed();
        this.ref.value = value;
    }

    constructor(valueInternal: T)
    {
        super();

        this.ref = shallowRef(valueInternal);
    }

    mutate(mutationData: T extends Record<string, any> ? Partial<T> : never): void
    {
        if (isObject(this.ref.value) && isObject(mutationData))
        {
            const hasChanges = Object.entries(mutationData).some(([key, value]) => (this.ref.value as any)[key] !== value);

            if (hasChanges)
            {
                this.ref.value = { ...this.ref.value, ...mutationData };
            }
        }
        else
        {
            throw new Error('Non object mutation is forbidden');
        }
    }
}