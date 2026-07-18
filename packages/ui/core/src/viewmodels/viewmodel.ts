import type { ObservableReadonly } from '@client/shared';


export abstract class Viewmodel<T>
{
    abstract state: ObservableReadonly<T>;
}
