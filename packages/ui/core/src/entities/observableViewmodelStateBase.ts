import type { Action } from '@client/shared';
import type { DisposeToken } from '@client/shared';
import { mergeDeep, ObservableWritableBase } from '@client/shared';
import type { ObservableReadonly } from '@client/shared';
import { EntityData, type EntityScheme } from '@client/infrastructure-entity-schemes';
import { ObservableViewmodelState } from './observableViewmodelState';

export class ObservableViewmodelStateBase<TInput extends Record<string, any>, TOutput extends TInput = TInput> extends ObservableViewmodelState<TOutput>
{
    private observable: ObservableWritableBase<TOutput>;
    private entityData: EntityData<TInput, TOutput> | undefined;

    constructor(
        initialState: TInput,
        scheme?: EntityScheme<TInput, TOutput>,
    )
    {
        super();

        this.observable = new ObservableWritableBase(initialState as unknown as TOutput);

        if (scheme)
        {
            this.entityData = new EntityData(initialState, scheme);
            this.observable.value = this.entityData.value;
        }
    }

    get value(): TOutput
    {
        return this.observable.value;
    }

    override on(handler: Action<[TOutput]>, disposeToken?: DisposeToken): void
    {
        this.observable.on(handler, disposeToken);
    }

    override update(partialState: Partial<TInput>): void
    {
        if (this.entityData)
        {
            this.entityData.update(partialState);
            this.observable.value = this.entityData.value;
        }
        else
        {
            this.observable.value = mergeDeep(this.observable.value, partialState as unknown as Partial<TOutput>);
        }
    }

    override toReadonly(): ObservableReadonly<TOutput>
    {
        return this.observable.toReadonly();
    }

    override[Symbol.dispose](): void
    {
        this.observable[Symbol.dispose]();
    }
}
