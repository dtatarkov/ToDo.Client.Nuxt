import { vi } from 'vitest';
import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';

export function createButtonGeneralMock()
{
    return {
        title: '',
        color: 'neutral',
        isDisabled: false,
        isLoading: false,

        getCommand: vi.fn(),
        setCommand: vi.fn(),
        onClick: vi.fn(),
        disable: vi.fn(),
        enable: vi.fn(),
        click: vi.fn(),
        showLoader: vi.fn(),
        hideLoader: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies ButtonGeneral;
}