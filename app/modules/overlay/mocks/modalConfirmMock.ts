import type { ModalConfirm } from '@/modules/overlay/entities/modalConfirm';
import { buttonGeneralViewmodelMock } from '@/modules/uikit/mocks/buttonGeneralViewmodelMock';
import { vi } from 'vitest';

export const modalConfirmMock = {
    key: '',
    vnode: {} as VNode,
    title: '',
    description: '',
    content: undefined,
    isDisabled: false,

    buttonConfirm: buttonGeneralViewmodelMock,
    buttonCancel: buttonGeneralViewmodelMock,

    close: vi.fn(),
    setOverlay: vi.fn(),
    setAddButton: vi.fn(),
    setEditButton: vi.fn(),
} satisfies ModalConfirm;