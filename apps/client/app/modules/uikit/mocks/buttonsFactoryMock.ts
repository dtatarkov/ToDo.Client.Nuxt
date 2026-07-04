import { vi } from 'vitest';
import type { ButtonsFactory } from '../factories/buttonsFactory';

export const buttonsFactoryMock = {
    createButtonGeneral: vi.fn(),
    createButtonIcon: vi.fn()
} satisfies ButtonsFactory;