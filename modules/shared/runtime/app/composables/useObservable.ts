import type { Observable } from "../interfaces/observable";

export function useObservable<T>(observable: Observable<T>)
{
  const data        = shallowRef(observable.value);
  const unsubscribe = observable.subscribe(() =>
  {
    data.value = observable.value;
  });

  onScopeDispose(() =>
  {
    unsubscribe();
  });

  return data;
}