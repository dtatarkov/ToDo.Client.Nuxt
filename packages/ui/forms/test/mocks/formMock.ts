import { vi } from 'vitest';
import type { Form } from '../../src/entities/form';

export const formMock = {
    getElements: vi.fn(),
    isDisabled: vi.fn(),

    setData: vi.fn(),
    getData: vi.fn(),
    getSubmitCommand: vi.fn(),
    onValidationError: vi.fn(),
    [Symbol.dispose]: vi.fn(),
} satisfies Form;