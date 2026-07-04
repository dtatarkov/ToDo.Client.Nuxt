import { vi } from 'vitest';
import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';
import type { VNode } from 'vue';

export function createButtonGeneralMock()
{
    return {
        key: '',
        title: '',
        color: 'neutral',
        isDisabled: false,
        isLoading: false,

        vnode: {} as VNode,

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