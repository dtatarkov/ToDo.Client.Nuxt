export interface Observable<T> extends Subscribable
{
  get value(): T;
}