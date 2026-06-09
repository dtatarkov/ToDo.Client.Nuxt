import { vi } from 'vitest';
import type { Modal } from '@/modules/overlay/entities/modal';

export const modalMock = {
    key: '',
    vnode: {} as VNode,
    title: '',
    description: '',

    setContent: vi.fn(),
    addButtonConfirm: vi.fn(),
    addButtonCancel: vi.fn(),
    close: vi.fn(),
    setOverlay: vi.fn(),
} satisfies Modal;