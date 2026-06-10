import { vi } from 'vitest';
import type { Modal } from '@/modules/overlay/entities/modal';

export const modalMock = {
    key: '',
    vnode: {} as VNode,

    enable: vi.fn(),
    disable: vi.fn(),
    close: vi.fn(),
    setOverlay: vi.fn(),
} satisfies Modal;

