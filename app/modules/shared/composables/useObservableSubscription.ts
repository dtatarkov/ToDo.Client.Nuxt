import { EffectsContainerBase } from '../entities/effectsContainerBase';
import type { Observable } from '../interfaces/observable';
import type { Action } from '../types/action';

export function useObservableSubscription<T>(observable: Observable<T>, handler: Action<[T]>)
{
    const effectsContainer = new EffectsContainerBase();

    effectsContainer.withContainer(() =>
    {
        observable.subscribe(handler);
    });

    handler(observable.value);

    onScopeDispose(() =>
    {
        effectsContainer.destroy();
    });
};