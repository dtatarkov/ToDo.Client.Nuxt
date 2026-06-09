import { vi } from 'vitest';
import type { Modal } from '@/modules/overlay/entities/modal';

export const modalMock = {
    key: '',
    vnode: {} as VNode,
    title: '',
    description: '',
    content: undefined,
    isDisabled: false,

    addButtonConfirm: vi.fn(),
    addButtonCancel: vi.fn(),
    enable: vi.fn(),
    disable: vi.fn(),
    close: vi.fn(),
    setOverlay: vi.fn(),
} satisfies Modal;