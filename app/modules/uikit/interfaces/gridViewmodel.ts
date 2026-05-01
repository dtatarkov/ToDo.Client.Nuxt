import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';
import { Viewmodel } from "./viewmodel";

export abstract class GridViewmodel<T extends Viewmodel = Viewmodel> extends Viewmodel<string>
{
    abstract get elements(): T[];

    abstract setSource(source: MaybeObservable<T[]>): void;
}