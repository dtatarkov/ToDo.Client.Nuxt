import type { Observable } from '../interfaces/observable';
import { useEffectsContainer } from './useEffectsContainer';


export async function useAsyncObservable<T>(observablePromise: Promise<Observable<T>>)
{
    const effectsContainer = useEffectsContainer();

    onScopeDispose(() =>
    {
        effectsContainer.destroy();
    });

    const observable = await observablePromise;
    const data = shallowRef(observable.value);

    effectsContainer.withContainer(() =>
    {
        observable.subscribe((newValue: T) =>
        {
            data.value = newValue;
        });
    });

    return data;
}
