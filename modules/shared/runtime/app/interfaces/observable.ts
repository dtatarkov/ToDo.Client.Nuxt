import type { Subscribable } from "./subscribable";

export interface Observable<T> extends Subscribable
{
  get value(): T;
}