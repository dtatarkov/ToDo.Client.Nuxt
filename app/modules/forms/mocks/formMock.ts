import { vi } from 'vitest';
import type { Form } from '@/modules/forms/entities/form';
import { uiElementActionMock } from '@/modules/uikit/mocks/uiElementActionMock';

export const formMock = {
    key: '',
    vnode: {} as VNode,
    elements: [],
    action: uiElementActionMock,
    isDisabled: false,

    setSubmitHandler: vi.fn(),
    setElements: vi.fn(),
    setElementsFromScheme: vi.fn(),
    setData: vi.fn(),
    submitAsync: vi.fn(),
    getData: vi.fn(),
    destroy: vi.fn(),
} satisfies Form;