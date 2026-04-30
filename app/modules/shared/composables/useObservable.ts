import type { Observable } from '../interfaces/observable';
import { useEffectsContainer } from './useEffectsContainer';

export function useObservable<T>(observable: Observable<T>)
{
  useEffectsContainer(() =>
  {
    observable.subscribe((newValue: T) =>
    {
      data.value = newValue;
    });
  });

  const data = shallowRef(observable.value);

  return data;
}