import type { Action } from '../types/action';

export function callbacksWrapper<Callbacks extends Record<string, Action<any[]>>>(): Action<[Partial<Callbacks>]> & Partial<Callbacks>
{
    let isFirstCall = true;

    function setter(newCallbacks: Partial<Callbacks>): void
    {
        if (!isFirstCall)
        {
            throw new Error('Callbacks already set');
        }

        isFirstCall = false;
        Object.assign(setter, newCallbacks);
    }

    return setter as Action<[Partial<Callbacks>]> & Partial<Callbacks>;
}