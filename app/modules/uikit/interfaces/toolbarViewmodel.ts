import { Viewmodel } from "./viewmodel";

export abstract class ToolbarViewmodel<T extends Viewmodel = Viewmodel> extends Viewmodel
{
    abstract get elements(): T[];

    abstract addElement(element: T): void;
    abstract clear(): void;
}