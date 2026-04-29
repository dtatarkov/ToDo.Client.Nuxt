import { LazyEntity } from '../interfaces/lazyEntity';
import type { Func } from '../types/func';

export class LazyEntityBase<T> extends LazyEntity<T>
{
    private isInitialized = false;
    private valueInternal: T | undefined;

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
};