import { vi } from 'vitest';
import type { ModalConfigurator } from '../entities/modalConfigurator';

export const modalConfiguratorMock = {
    setTitle: vi.fn(),
    setDescription: vi.fn(),
    setContent: vi.fn(),
    addButtonConfirm: vi.fn(),
    addButtonCancel: vi.fn(),
    init: vi.fn(),
} satisfies ModalConfigurator;