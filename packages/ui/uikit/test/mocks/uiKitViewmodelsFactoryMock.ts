import { vi } from 'vitest';
import type { UIKitViewmodelsFactory } from '../../src/factories/uiKitViewmodelsFactory';

export function createUiKitViewmodelsFactoryMock()
{
    return {
        createInput: vi.fn(),
        createInputText: vi.fn(),
        createTextarea: vi.fn(),
        createInputDate: vi.fn(),
        createInputTime: vi.fn(),
        createInputDateTime: vi.fn(),
        createInputHidden: vi.fn(),
        createInfoBlock: vi.fn(),
        createButtonGeneral: vi.fn(),
        createButtonIcon: vi.fn(),
    } satisfies UIKitViewmodelsFactory;
}

export const uiKitViewmodelsFactoryMock = createUiKitViewmodelsFactoryMock();
