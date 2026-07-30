import type { vi } from 'vitest';
import type { Action } from '../../src/types/action';
import { getPromiseResolverAsync } from '../../src/utils/getPromiseResolverAsync';

export async function setupPausedHandlerAsync(handler: ReturnType<typeof vi.fn>): Promise<Action>
{
    const { resolve, promise } = await getPromiseResolverAsync();

    handler.mockReturnValue(promise);

    return resolve;
}