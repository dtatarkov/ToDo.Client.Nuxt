import type { Action } from '@client/shared';
import type { DisposeToken } from '@client/shared';
import type { ObservableReadonly } from '@client/shared';

export abstract class ObservableViewmodelState<TState extends Record<string, any>> implements ObservableReadonly<TState>
{
    abstract readonly value: TState;

    abstract on(handler: Action<[TState]>, disposeToken?: DisposeToken): void;
    abstract update(partialState: Partial<TState>): void;
    abstract toReadonly(): ObservableReadonly<TState>;
    abstract [Symbol.dispose](): void;
}
