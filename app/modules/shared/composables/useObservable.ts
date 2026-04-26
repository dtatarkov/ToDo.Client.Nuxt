import { EffectsContainerBase } from '../entities/effectsContainerBase';
import type { Observable } from '../interfaces/observable';

export function useObservable<T>(observable: Observable<T>)
{
  const effectsContainer = new EffectsContainerBase();
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