import { ReactiveField } from '../interfaces/reactiveField';
import type { ValueOrGetter } from '../types/valueOrGetter';
import { isFunction } from '../utils/isFunction';

export class ReactiveFieldVue<T> extends ReactiveField<T>
{
    private readonly ref: Ref<T | Ref<T>>;

    constructor(initialValue: ValueOrGetter<T>)
    {
        super();

        const initialValueNormalized = this.normalizeValue(initialValue);

        this.ref = shallowRef(initialValueNormalized) as Ref<T>;
    }

    override get value(): T
    {
        return unref(this.ref.value);
    }
    override set value(value: ValueOrGetter<T>)
    {
        const valueNormalized = this.normalizeValue(value);
        this.ref.value = valueNormalized as T;
    }

    private normalizeValue(value: ValueOrGetter<T>): Ref<T> | T
    {
        const result = isFunction(value) ? toRef(value) : value;

        return result;
    }

}