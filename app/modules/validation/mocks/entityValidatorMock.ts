import { vi } from 'vitest';
import type { EntityValidator } from '../entities/entityValidator';

export function createEntityValidatorMock()
{
    return {
        validateField: vi.fn(),
    } satisfies EntityValidator;
}