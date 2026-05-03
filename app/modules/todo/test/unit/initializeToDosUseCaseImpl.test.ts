import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InitializeToDosUseCaseImpl } from '../../usecases/initializeToDosUseCaseImpl';
import type { ToDosOwner } from '../../interfaces/todosOwner';

describe('InitializeToDosUseCaseImpl', () =>
{
    const todosOwner = {
        getAllToDos: vi.fn(),
        getAllToDosAsync: vi.fn(),
        getToDoByIdAsync: vi.fn(),
        updateToDosAsync: vi.fn(),
        initializeToDosAsync: vi.fn(),
        saveToDoAsync: vi.fn(),
        createToDo: vi.fn()
    } satisfies ToDosOwner;

    const useCase = new InitializeToDosUseCaseImpl(todosOwner);

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should call todosOwner.initializeToDosAsync', async () =>
        {
            await useCase.executeAsync();
            expect(todosOwner.initializeToDosAsync).toHaveBeenCalledTimes(1);
        });
    });
});