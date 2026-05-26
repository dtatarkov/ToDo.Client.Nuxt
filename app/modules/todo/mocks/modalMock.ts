import { vi } from 'vitest';
import type { ModalViewmodel } from '@/modules/overlay/interfaces/modalViewmodel';

export const modalMock = {
    key: '',
    title: '',
    description: '',
    content: undefined,
    controls: [],
    isDisabled: false,

    component: {
        setup: vi.fn(),
    },

    close: vi.fn(),
    setOverlay: vi.fn(),
} satisfies ModalViewmodel;