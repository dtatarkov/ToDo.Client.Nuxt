import type { Action } from '@client/shared';
import type { DisposeToken } from '@client/shared';
import { mergeDeep, ObservableWritableBase } from '@client/shared';
import type { ObservableReadonly } from '@client/shared';
import { EntityData, type EntityScheme } from '@client/infrastructure-entity-schemes';
import { ObservableViewmodelState } from './observableViewmodelState';

export class ObservableViewmodelStateBase<TState extends Record<string, any>> extends ObservableViewmodelState<TState>
{
    private observable: ObservableWritableBase<TState>;
    private entityData: EntityData<TState> | undefined;

    constructor(
        initialState: TState,
        scheme?: EntityScheme<TState>,
    )
    {
        super();

        this.observable = new ObservableWritableBase(initialState);

        if (scheme)
        {
            this.entityData = new EntityData(initialState, scheme);
            this.observable.value = this.entityData.value;
        }
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
        if (this.entityData)
        {
            this.entityData.update(partialState);
            this.observable.value = this.entityData.value;
        }
        else
        {
            this.observable.value = mergeDeep(this.observable.value, partialState);
        }
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
