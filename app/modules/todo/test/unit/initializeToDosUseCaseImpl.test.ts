import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InitializeToDosUseCaseImpl } from '../../usecases/initializeToDosUseCaseImpl';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';

describe('InitializeToDosUseCaseImpl', () =>
{
    const useCase = new InitializeToDosUseCaseImpl(todosOwnerMock);

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should call todosOwner.initializeToDosAsync', async () =>
        {
            await useCase.executeAsync();
            expect(todosOwnerMock.initializeToDosAsync).toHaveBeenCalledTimes(1);
        });
    });
});