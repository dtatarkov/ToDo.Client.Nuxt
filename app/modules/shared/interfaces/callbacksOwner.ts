import type { Action } from '../types/action';

export abstract class CallbacksOwner<Callbacks extends Record<string, Action<any[]>>>
{
    abstract on(callbacks: Partial<Callbacks>): void;
}