import { vi } from 'vitest';
import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';
import type { VNode } from 'vue';

export const buttonGeneralMock = {
    key: '',
    title: '',
    color: 'neutral',
    isDisabled: false,
    isLoading: false,

    vnode: {} as VNode,

    setCommand: vi.fn(),
    on: vi.fn(),
    disable: vi.fn(),
    enable: vi.fn(),
    showLoader: vi.fn(),
    hideLoader: vi.fn(),
} satisfies ButtonGeneral;