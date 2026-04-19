export abstract class Subscribable<T = void> extends Destroyable
{
  abstract subscribe(handler: Action<[T]>): Action;
}

