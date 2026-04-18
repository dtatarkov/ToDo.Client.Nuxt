import { Observable } from "./observable";

export abstract class ObservableWritable<T> extends Observable<T>
{
  abstract override get value(): T;
  abstract override set value(value: T);
}