import { vi } from 'vitest';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export const formMock = {
    key: '',
    elements: [],
    isDisabled: false,
    component: {
        setup: vi.fn()
    },

    setElements: vi.fn(),
    setData: vi.fn(),
    submit: vi.fn(),
    getData: vi.fn(),
    setDisabledStateChangeHandler: vi.fn(),
    setSubmittedHandler: vi.fn(),
    destroy: vi.fn(),
} satisfies FormViewmodel;