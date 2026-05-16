import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ShowAddToDoDialogUseCaseImpl } from '../../usecases/showAddToDoDialogUseCaseImpl';
import type { ToDo } from '../../interfaces/todo';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';

// Mock ToDo
const createMockToDo = (): ToDo =>
{
    return {
        id: '1',
        title: 'Test ToDo',
        description: 'Test Description',
        completionDatePlanned: undefined,
        completionDateActual: undefined,
        owner: undefined,
        isNew: true,
        getData: vi.fn(),
        clone: vi.fn(),
        saveAsync: vi.fn(),
        showEditDialog: vi.fn(),
        toObservableData: vi.fn()
    };
};

describe('ShowAddToDoDialogUseCaseImpl', () =>
{
    const useCase = new ShowAddToDoDialogUseCaseImpl(todosOwnerMock);

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should create a new todo and show edit dialog', () =>
        {
            const todo = createMockToDo();
            todosOwnerMock.createToDo.mockReturnValue(todo);

            useCase.execute();

            expect(todosOwnerMock.createToDo).toHaveBeenCalledTimes(1);
            expect(todo.showEditDialog).toHaveBeenCalledTimes(1);
        });
    });
});