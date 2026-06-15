import { vi } from 'vitest';
import type { Modal } from '@/modules/overlay/entities/modal';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { createButtonGeneralMock } from '@/modules/uikit/mocks/buttonGeneralMock';

export const modalMock = {
    key: '',
    title: '',
    description: '',
    vnode: {} as VNode,
    buttonConfirm: createButtonGeneralMock(),
    buttonCancel: createButtonGeneralMock(),

    content: {
        key: '',
        vnode: {} as VNode,
        [Symbol.dispose]: vi.fn(),
    },

    enable: vi.fn(),
    disable: vi.fn(),
    close: vi.fn(),
    setOverlay: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Modal<UIElement>;

