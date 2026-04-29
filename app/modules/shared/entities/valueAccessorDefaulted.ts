import { ValueAccessor } from '../interfaces/internal/valueAccessor';
import type { Func } from '../types/func';

export class ValueAccessorDefaulted<T> extends ValueAccessor<T>
{
    protected isInitialized = false;
    protected valueInternal: T | undefined;

    constructor(private factory: Func<T>)
    {
        super();
    }

    override get value(): T
    {
        if (!this.isInitialized)
        {
            this.valueInternal = this.factory();
            this.isInitialized = true;
        }

        return this.valueInternal as T;
    }

    override set value(value: T)
    {
        if (!this.isInitialized)
        {
            this.isInitialized = true;
        }

        this.valueInternal = value;
    }
};
