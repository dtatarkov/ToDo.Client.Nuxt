import type { Subscribable } from '../interfaces/subscribable';
import type { Action } from '../types/action';
import { useEffectsContainer } from './useEffectsContainer';

export function useSubscribable<T>(subscribable: Subscribable<T>, handler: Action<[T]>)
{
    useEffectsContainer(() =>
    {
        subscribable.subscribe(handler);
    });
}