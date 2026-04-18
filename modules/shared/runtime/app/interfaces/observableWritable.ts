import type { Observable } from "./observable";

export interface ObservableWritable<T> extends Observable<T>
{
  get value(): T;
  set value(value: T);
}