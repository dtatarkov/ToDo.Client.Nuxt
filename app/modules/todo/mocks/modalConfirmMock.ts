import type { ModalConfirm } from '@/modules/overlay/entities/modalConfirm';
import { buttonGeneralViewmodelMock } from '@/modules/uikit/mocks/buttonGeneralViewmodelMock';
import { vi } from 'vitest';

export const modalConfirmMock = {
    key: '',
    title: '',
    description: '',
    content: undefined,
    isDisabled: false,

    buttonConfirm: buttonGeneralViewmodelMock,
    buttonCancel: buttonGeneralViewmodelMock,

    component: {
        setup: vi.fn(),
    },

    close: vi.fn(),
    setOverlay: vi.fn(),
    setAddButton: vi.fn(),
    setEditButton: vi.fn(),
} satisfies ModalConfirm;