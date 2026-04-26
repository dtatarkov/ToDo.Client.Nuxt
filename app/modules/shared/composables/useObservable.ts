import type { Observable } from '../interfaces/observable';
import { useEffectsContainer } from './useEffectsContainer';

export function useObservable<T>(observable: Observable<T>)
{
  const effectsContainer = useEffectsContainer();
  const data = shallowRef(observable.value);

  effectsContainer.withContainer(() =>
  {
    observable.subscribe((newValue: T) =>
    {
      data.value = newValue;
    });
  });

  onScopeDispose(() =>
  {
    effectsContainer.destroy();
  });

  return data;
}