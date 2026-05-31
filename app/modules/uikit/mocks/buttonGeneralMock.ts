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

    setClickHandler: vi.fn(),
} satisfies ButtonGeneral;