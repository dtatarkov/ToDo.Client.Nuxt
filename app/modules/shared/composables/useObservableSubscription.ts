import { EffectsContainerImpl } from '../entities/effectsContainerImpl';
import type { Observable } from '../interfaces/observable';
import type { Action } from '../types/action';

export function useObservableSubscription<T>(observable: Observable<T>, handler: Action<[T]>)
{
    const effectsContainer = new EffectsContainerImpl();

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