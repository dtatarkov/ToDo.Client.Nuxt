export abstract class EventBus<T = void>
{
  abstract subscribe(handler: Action<[T]>): Action;

  abstract emit(data: T): void;

  abstract destroy(): void;
}