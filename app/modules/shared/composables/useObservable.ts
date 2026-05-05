import type { Observable } from '../interfaces/observable';
import type { Action } from '../types/action';
import { useEffectsContainer } from './useEffectsContainer';

export function useObservable<T>(observable: Observable<T>)
{
  const result = customRef((track: Action, trigger: Action) =>
  {
    useEffectsContainer(() =>
    {
      observable.subscribe(() =>
      {
        trigger();
      });
    });

    return {
      get()
      {
        track();
        return observable.value;
      },

      set()
      {
        throw new Error('Observable is read-only');
      }
    };
  });

  return result;
}