import { Viewmodel } from "./viewmodel";

export abstract class GridViewmodel<T extends Viewmodel = Viewmodel> extends Viewmodel<string>
{
    abstract get elements(): T[];
}