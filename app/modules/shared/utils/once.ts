import type { Action } from '../types/action';

export function once(fn: Action<[]>): Action<[]>
{
    let called = false;

    const wrappedFn = () => 
    {
        if (!called)
        {
            called = true;
            fn();
        }
    };

    return wrappedFn;
}