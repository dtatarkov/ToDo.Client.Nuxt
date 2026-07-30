import { vi } from 'vitest';
import type { ObservableArray } from '../../src/entities/observableArray';

export function createObservableArrayMock<T>(value = [] as T[])
{
    return {
        get value()
        {
            return value;
        },

        on: vi.fn(),
        add: vi.fn(),
        remove: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies ObservableArray<T>;
};