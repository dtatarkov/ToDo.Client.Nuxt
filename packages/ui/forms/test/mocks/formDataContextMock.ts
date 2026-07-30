import { vi } from 'vitest';
import type { FormDataContext } from '../../src/entities/formDataContext';

export const formDataContextMock = {
    getData: vi.fn(),
    setData: vi.fn(),
} satisfies FormDataContext<any>;