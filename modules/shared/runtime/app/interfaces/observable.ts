export abstract class Observable<T> extends Subscribable
{
  abstract get value(): T;
}