import { vi } from 'vitest';
import type { Form } from '@/modules/forms/entities/form';

export const formMock = {
    key: '',
    vnode: {} as VNode,
    elements: [],
    isDisabled: false,

    setElements: vi.fn(),
    setElementsFromScheme: vi.fn(),
    setData: vi.fn(),
    submitAsync: vi.fn(),
    getData: vi.fn(),
    getSubmitCommand: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Form;