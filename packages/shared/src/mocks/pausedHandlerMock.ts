import type { vi } from 'vitest';
import type { Action } from '../types/action';
import { getPromiseResolverAsync } from '../utils/getPromiseResolverAsync';

export async function setupPausedHandlerAsync(handler: ReturnType<typeof vi.fn>): Promise<Action>
{
    const { resolve, promise } = await getPromiseResolverAsync();

    handler.mockReturnValue(promise);

    return resolve;
}