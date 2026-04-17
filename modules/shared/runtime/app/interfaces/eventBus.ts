export abstract class EventBus
{
  abstract subscribe(handler: Action, options?: EventBusSubscriptionOptions): Action;

  abstract onAwake(handler: Func<Action>): void;

  abstract emit(): void;

  abstract destroy(): void;
}

export type EventBusSubscriptionOptions = {
  immediate?: boolean;
}