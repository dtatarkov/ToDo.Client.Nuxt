import { vi } from 'vitest';
import type { Form } from '@/modules/forms/entities/form';

export const formMock = {
    key: '',
    vnode: {} as VNode,
    elements: [],
    isDisabled: false,

    setData: vi.fn(),
    getData: vi.fn(),
    getSubmitCommand: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Form;