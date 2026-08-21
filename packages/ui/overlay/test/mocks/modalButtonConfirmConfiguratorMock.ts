import { vi } from 'vitest';
import type { ModalButtonConfirmConfigurator } from '../../src/configuration/modalButtonConfirmConfigurator';

export function createModalButtonConfirmConfiguratorMock()
{
    return {
        withCommand: vi.fn().mockReturnThis(),
        asCreateButton: vi.fn(),
        asEditButton: vi.fn(),
    } satisfies ModalButtonConfirmConfigurator;
}