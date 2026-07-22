import type { ObservableReadonly } from '@client/shared';


export abstract class Viewmodel<TState extends Record<string, any>> implements Disposable
{
    abstract state: ObservableReadonly<TState>;
    abstract [Symbol.dispose](): void;
}
