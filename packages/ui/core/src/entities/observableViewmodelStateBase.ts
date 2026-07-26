import type { Action } from '@client/shared';
import type { DisposeToken } from '@client/shared';
import { mergeDeep, ObservableWritableBase } from '@client/shared';
import type { ObservableReadonly } from '@client/shared';
import { ObservableViewmodelState } from './observableViewmodelState';

export class ObservableViewmodelStateBase<TState extends Record<string, any>> extends ObservableViewmodelState<TState>
{
    private observable: ObservableWritableBase<TState>;

    constructor(initialState: TState)
    {
        super();

        this.observable = new ObservableWritableBase(initialState);
    }

    get value(): TState
    {
        return this.observable.value;
    }

    override on(handler: Action<[TState]>, disposeToken?: DisposeToken): void
    {
        this.observable.on(handler, disposeToken);
    }

    override update(partialState: Partial<TState>): void
    {
        this.observable.value = mergeDeep(this.observable.value, partialState);
    }

    override toReadonly(): ObservableReadonly<TState>
    {
        return this.observable.toReadonly();
    }

    override[Symbol.dispose](): void
    {
        this.observable[Symbol.dispose]();
    }
}
