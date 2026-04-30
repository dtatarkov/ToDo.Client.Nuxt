import type { Observable } from '../interfaces/observable';
import type { Action } from '../types/action';
import { useEffectsContainer } from './useEffectsContainer';

export function useObservableSubscription<T>(observable: Observable<T>, handler: Action<[T]>)
{
    useEffectsContainer(() =>
    {
        observable.subscribe(handler);
    });

    handler(observable.value);
};