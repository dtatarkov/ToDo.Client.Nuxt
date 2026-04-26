import type { Action } from '../types/action';
import { Destroyable } from './destroyable';

export abstract class EffectsContainer extends Destroyable
{
    static current: EffectsContainer | undefined;

    abstract withContainer(action: Action): void;
    abstract register(onDestroy: Action): void;
    abstract clear(): void;
}