import { vi } from 'vitest';
import type { Viewmodel } from '../../src/viewmodels/viewmodel';
import { createObservableViewmodelStateMock } from './observableViewmodelStateMock';

export function createViewmodelMock<TState extends Record<string, any>>(state: TState)
{
    return {
        state: createObservableViewmodelStateMock(state),
        [Symbol.dispose]: vi.fn(),
    } satisfies Viewmodel<TState>;
}

export const viewmodelMock = createViewmodelMock({});
