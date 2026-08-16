import { Viewmodel } from './viewmodel';
import type { ObservableViewmodelState } from '../entities/observableViewmodelState';
import { DisposeToken } from '@client/shared';

export abstract class ViewmodelBase<TState extends Record<string, any>> extends Viewmodel<TState>
{
    protected disposeToken = new DisposeToken();

    abstract override state: ObservableViewmodelState<TState>;

    override[Symbol.dispose]()
    {
        this.disposeToken[Symbol.dispose]();
        this.state[Symbol.dispose]();
    }
}
