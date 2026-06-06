import type { ModalConfirm } from '@/modules/overlay/entities/modalConfirm';
import { buttonGeneralMock } from '@/modules/uikit/mocks/buttonGeneralMock';
import { vi } from 'vitest';

export const modalConfirmMock = {
    key: '',
    vnode: {} as VNode,
    title: '',
    description: '',
    content: undefined,
    isDisabled: false,

    buttonConfirm: buttonGeneralMock,
    buttonCancel: buttonGeneralMock,

    close: vi.fn(),
    setOverlay: vi.fn(),
    toAddMode: vi.fn(),
    toEditMode: vi.fn(),
    setConfirmCommand: vi.fn(),
} satisfies ModalConfirm;