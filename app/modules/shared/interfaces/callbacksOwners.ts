import type { Action } from '../types/action';

export abstract class CallbacksOwners<Callbacks extends Record<string, Action<any[]>>>
{
    abstract on(callbacks: Partial<Callbacks>): void;
}