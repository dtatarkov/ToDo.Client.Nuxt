import { vi } from 'vitest';
import type { ObservableReadonly } from '../entities/observableReadonly';

export function createObservableReadonlyMock<T>(value: T)
{
    return {
        get value()
        {
            return value;
        },

        on: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies ObservableReadonly<T>;
}; 