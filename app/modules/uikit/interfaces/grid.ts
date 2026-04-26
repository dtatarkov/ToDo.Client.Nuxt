import { UIElement } from "./uiElement";
import type { Observable } from "@/modules/shared/interfaces/observable";

export abstract class Grid<T extends UIElement = UIElement> extends UIElement<string>
{
    abstract get elements(): T[];
}