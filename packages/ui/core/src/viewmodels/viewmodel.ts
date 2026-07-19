import type { ObservableReadonly } from '@client/shared';


export abstract class Viewmodel<T> implements Disposable
{
    abstract state: ObservableReadonly<T>;
    abstract [Symbol.dispose](): void;
}
