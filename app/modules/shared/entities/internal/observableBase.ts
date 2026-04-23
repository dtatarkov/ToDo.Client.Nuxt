import type { ObservableTrackingContext } from '../../interfaces/internal/observableTrackingContext';
import type { Observable } from '../../interfaces/observable';
import type { Action } from '../../types/action';
import { EventBusBase } from '../eventBusBase';

export abstract class ObservableBase<T> implements Observable<T>
{
  protected static currentContext: ObservableTrackingContext | undefined;

  protected eventbus = new EventBusBase<T>();

  protected get context()
  {
    return ObservableBase.currentContext;
  }

  protected set context(context: ObservableTrackingContext | undefined)
  {
    ObservableBase.currentContext = context;
  }

  abstract get value(): T;

  abstract subscribe(handler: Action<[T]>): Action;
  abstract destroy(): void;
}