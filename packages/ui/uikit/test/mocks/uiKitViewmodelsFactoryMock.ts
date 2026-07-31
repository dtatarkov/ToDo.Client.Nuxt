import { vi } from 'vitest';
import type { UIKitViewmodelsFactory } from '../../src/factories/uiKitViewmodelsFactory';

export function createUiKitViewmodelsFactoryMock()
{
    return {
        createInputText: vi.fn(),
        createTextarea: vi.fn(),
        createInputDate: vi.fn(),
        createInputTime: vi.fn(),
        createInputDateTime: vi.fn(),
        createInfoBlock: vi.fn(),
    } satisfies UIKitViewmodelsFactory;
}

export const uiKitViewmodelsFactoryMock = createUiKitViewmodelsFactoryMock();
