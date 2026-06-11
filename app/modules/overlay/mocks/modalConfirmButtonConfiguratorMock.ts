import { vi } from 'vitest';
import type { ModalButtonConfirmConfigurator } from '../entities/modalButtonConfirmConfigurator';

export const modalConfirmButtonConfiguratorMock = {
    asCreateButton: vi.fn(),
    asEditButton: vi.fn(),
} satisfies ModalButtonConfirmConfigurator;