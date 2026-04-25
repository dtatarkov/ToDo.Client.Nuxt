import { Subscribable } from './subscribable';

export abstract class EventBus<T = void> extends Subscribable<T>
{
  abstract subscriptionsCount: number;

  abstract emit(data: T): void;
}