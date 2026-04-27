import type { VComponent } from "../types/vcomponent";

export abstract class Viewmodel<Key extends string | number = string | number>
{
  abstract readonly key: Key;
  abstract readonly component: VComponent;
}