import { vi } from 'vitest';
import type { Modal } from '@/modules/overlay/entities/modal';

export const modalMock = {
    key: '',
    vnode: {} as VNode,
    title: '',
    description: '',
    content: undefined,
    isDisabled: false,

    close: vi.fn(),
    setOverlay: vi.fn(),
} satisfies Modal;