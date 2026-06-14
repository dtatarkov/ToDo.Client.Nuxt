import { vi } from 'vitest';
import type { InputElementsFactory } from '../factories/inputElementsFactory';

export const inputElementsFactoryMock = {
    createInputText: vi.fn(),
    createTextarea: vi.fn(),
    createInputDate: vi.fn(),
    createInputTime: vi.fn(),
    createInputDateTime: vi.fn(),
} satisfies InputElementsFactory;