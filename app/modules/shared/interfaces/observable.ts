import { Subscribable } from './subscribable';

export abstract class Observable<T> extends Subscribable<T>
{
  abstract get value(): T;
}