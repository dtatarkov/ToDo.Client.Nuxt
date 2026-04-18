import type { Destroyable } from "./destroyable";
import type { Action } from "../types/action";
import type { SubscriptionOptions } from "../types/subscriptionOptions";

export interface Subscribable extends Destroyable
{
  subscribe(handler: Action, options?: SubscriptionOptions): Action;
}

