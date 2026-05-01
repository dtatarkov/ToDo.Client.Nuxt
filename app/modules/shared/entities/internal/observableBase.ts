import type { ObservableTrackingContext } from '../../interfaces/internal/observableTrackingContext';
import { Observable } from '../../interfaces/observable';
import { EventBusBase } from '../eventBusBase';

export abstract class ObservableBase<T> extends Observable<T>
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

  get subscriptionsCount()
  {
    return this.eventbus.subscriptionsCount;
  }
}