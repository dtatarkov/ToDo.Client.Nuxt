import type { ObservableWritableBase } from '@client/shared';
import { mergeDeep } from '@client/shared';
import { Viewmodel } from './viewmodel';

export abstract class ViewmodelBase<TState extends Record<string, any>> extends Viewmodel<TState>
{
    abstract override state: ObservableWritableBase<TState>;

    override[Symbol.dispose]()
    {
        this.state[Symbol.dispose]();
    }

    protected updateState(change: Partial<TState>): void
    {
        this.state.value = mergeDeep(this.state.value, change);
    }
}
