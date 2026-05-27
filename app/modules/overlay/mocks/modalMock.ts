import { vi } from 'vitest';
import type { Modal } from '@/modules/overlay/entities/modal';

export const modalMock = {
    key: '',
    title: '',
    description: '',
    content: undefined,
    isDisabled: false,

    component: {
        setup: vi.fn(),
    },

    close: vi.fn(),
    setOverlay: vi.fn(),
} satisfies Modal;