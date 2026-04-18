import type { VComponent } from "../types/internal/vcomponent";

export abstract class UIElement<Key extends string | number = string | number>
{
  abstract readonly key: Key;
  abstract readonly component: VComponent;
}