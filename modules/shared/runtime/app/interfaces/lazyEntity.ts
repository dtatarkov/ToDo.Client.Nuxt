export abstract class LazyEntity<T>
{
    abstract get value(): T;
}