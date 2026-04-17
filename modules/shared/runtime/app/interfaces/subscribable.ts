export abstract class Subscribable extends Destroyable
{
  abstract subscribe(handler: Action, options?: SubscriptionOptions): Action;
}

