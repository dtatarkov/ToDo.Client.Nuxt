import { vi } from 'vitest';
import type { FormViewmodel } from '../../src/viewmodels/formViewmodel';
import { createRenderableViewmodelMock } from '@client/ui-core/mocks';

export const formViewmodelMock = {
    ...createRenderableViewmodelMock(),
    getData: vi.fn(),
    setData: vi.fn(),
    getSubmitCommand: vi.fn(),
    submitAsync: vi.fn(),
    onValidationError: vi.fn(),
} satisfies FormViewmodel;
