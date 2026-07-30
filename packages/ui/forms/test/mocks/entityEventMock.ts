import { vi } from 'vitest';
import type { IEntityEvent } from '@client/shared';

export function createEntityEventMock()
{
    return {
        on: vi.fn(),
        emit: vi.fn(),
        [Symbol.dispose]: vi.fn(),
    } satisfies IEntityEvent<any>;
}