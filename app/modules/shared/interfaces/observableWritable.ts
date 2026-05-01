import { Observable } from "./observable";

export abstract class ObservableWritable<T> extends Observable<T>
{
  abstract override get value(): T;
  abstract override set value(value: T);
  abstract mutate(mutationData: T extends Record<string, any> ? Partial<T> : never): void;
}