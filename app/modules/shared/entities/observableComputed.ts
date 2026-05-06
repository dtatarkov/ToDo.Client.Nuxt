import type { Observable } from '../interfaces/observable';
import { computed } from 'vue';
import { ObservableVue } from './internal/observableVue';

export class ObservableComputed<T> extends ObservableVue<T> implements Observable<T>
{
    protected ref: Ref<T>;

    get value()
    {
        this.destroyToken.assertNotDestroyed();
        return this.ref.value;
    }

    constructor(factory: () => T)
    {
        super();

        this.ref = computed(factory);
    }
}