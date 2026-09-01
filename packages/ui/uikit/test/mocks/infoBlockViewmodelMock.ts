import { vi } from 'vitest';
import type { InfoBlockViewmodel, InfoBlockViewmodelState } from '../../src/viewmodels/infoBlockViewmodel';
import { createObservableReadonlyMock } from '@client/shared/mocks';

export function createInfoBlockViewmodelMock(state?: InfoBlockViewmodelState)
{
    state ??= {
        rows: [],
        hasRows: false
    };

    const mock = {
        state: createObservableReadonlyMock(state),
        addRow: vi.fn(),
        clear: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies InfoBlockViewmodel;

    return mock;
}

export const infoBlockViewmodelMock = createInfoBlockViewmodelMock();
