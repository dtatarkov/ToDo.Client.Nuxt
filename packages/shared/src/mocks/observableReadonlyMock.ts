import { vi } from 'vitest';
import type { ObservableReadonly } from '../entities/observableReadonly';
import { type Action } from '@client/shared';

export function createObservableReadonlyMock<T>(value: T)
{
    let currentValue = value;

    return {
        get value()
        {
            return currentValue;
        },

        on: vi.fn(),
        [Symbol.dispose]: vi.fn(),

        setMockValue: (value: T) =>
        {
            currentValue = value;
        }
    } satisfies ObservableReadonly<T> & { setMockValue: Action<[T]>; };
}; 