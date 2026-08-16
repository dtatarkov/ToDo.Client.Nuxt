import { vi } from 'vitest';
import type { ObservableReadonly } from '@client/shared';
import type { ObservableViewmodelState } from '../../src/entities/observableViewmodelState';

export function createObservableViewmodelStateMock<TState extends Record<string, any>>(
    initialState: TState,
)
{
    return {
        value: initialState,
        on: vi.fn(),
        update: vi.fn(),
        toReadonly: vi.fn<() => ObservableReadonly<TState>>(),
        [Symbol.dispose]: vi.fn(),
    } satisfies ObservableViewmodelState<TState>;
}
