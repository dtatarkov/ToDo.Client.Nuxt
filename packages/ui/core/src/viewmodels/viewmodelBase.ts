import { Viewmodel } from './viewmodel';
import type { ObservableViewmodelState } from '../entities/observableViewmodelState';

export abstract class ViewmodelBase<TState extends Record<string, any>> extends Viewmodel<TState>
{
    abstract override state: ObservableViewmodelState<TState>;

    override[Symbol.dispose]()
    {
        this.state[Symbol.dispose]();
    }
}
