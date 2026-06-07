import type { ModalConfirm } from '@/modules/overlay/entities/modalConfirm';
import { vi } from 'vitest';

export const modalConfirmMock = {
    key: '',
    vnode: {} as VNode,
    title: '',
    description: '',
    content: undefined,
    isDisabled: false,

    enable: vi.fn(),
    disable: vi.fn(),
    close: vi.fn(),
    setOverlay: vi.fn(),
    toAddMode: vi.fn(),
    toEditMode: vi.fn(),
    setConfirmCommand: vi.fn(),
} satisfies ModalConfirm;