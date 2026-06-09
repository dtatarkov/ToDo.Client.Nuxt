import { vi } from 'vitest';
import type { ModalConfirmButtonConfigurator } from '../entities/modalConfirmButtonConfigurator';

export const modalConfirmButtonConfiguratorMock = {
    asCreateButton: vi.fn(),
    asEditButton: vi.fn(),
} satisfies ModalConfirmButtonConfigurator;