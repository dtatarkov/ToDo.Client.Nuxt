import type { Observable } from '../interfaces/observable';

export function useObservable<T>(observable: Observable<T>)
{
  const data = shallowRef(observable.value);

  const unsubscribe = observable.subscribe((newValue: T) =>
  {
    data.value = newValue;
  });

  onScopeDispose(() =>
  {
    unsubscribe();
  });

  return data;
}