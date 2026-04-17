export interface Subscribable extends Destroyable
{
  subscribe(handler: Action, options?: SubscriptionOptions): Action;
}

