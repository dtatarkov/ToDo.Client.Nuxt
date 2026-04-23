import { LazyEntity } from '../interfaces/lazyEntity';
import type { Func } from '../types/func';

export class LazyEntityBase<T> extends LazyEntity<T>
{
    private _isInitialized = false;
    private _value: T | undefined;

    constructor(private factory: Func<T>)
    {
        super();
    }

    override get value(): T
    {
        if (!this._isInitialized)
        {
            this._value = this.factory();
            this._isInitialized = true;
        }

        return this._value as T;
    }
};