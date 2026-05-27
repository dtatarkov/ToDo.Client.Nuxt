import { vi } from 'vitest';
import type { Form } from '@/modules/forms/entities/form';

export const formMock = {
    key: '',
    vnode: {} as VNode,
    elements: [],
    isDisabled: false,

    setElements: vi.fn(),
    setData: vi.fn(),
    submit: vi.fn(),
    getData: vi.fn(),
    setDisabledStateChangeHandler: vi.fn(),
    setSubmittingStateChangeHandler: vi.fn(),
    setSubmittedHandler: vi.fn(),
    destroy: vi.fn(),
} satisfies Form;