import { vi } from 'vitest';
import type { IFormDataContext } from '../../src/entities/formDataContext';

export const formDataContextMock = {
    getData: vi.fn(),
    setData: vi.fn(),
} satisfies IFormDataContext<any>;
