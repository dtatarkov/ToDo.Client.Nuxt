import { describe, it, expect, vi, afterEach } from 'vitest';
import { ShowEditToDoDialogUseCaseImpl } from '../../usecases/showEditToDoDialogUseCaseImpl';
import type { ToDo } from '../../interfaces/todo';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';

// Mock ToDo
const createMockToDo = (id: string = '1'): ToDo =>
{
    return {
        id,
        title: 'Test ToDo',
        description: 'Test Description',
        completionDatePlanned: undefined,
        completionDateActual: undefined,
        owner: undefined,
        isNew: id === '',
        getData: vi.fn(),
        clone: vi.fn(),
        saveAsync: vi.fn(),
        toObservableData: vi.fn()
    };
};

describe('ShowEditToDoDialogUseCaseImpl', () =>
{
    const useCase = new ShowEditToDoDialogUseCaseImpl(todosOwnerMock);

    afterEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should show edit dialog for existing todo', async () =>
        {
            const todo = createMockToDo('123');

            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);
            await useCase.executeAsync('123');

            //todo fix
            //expect(todo.showEditDialog).toHaveBeenCalledTimes(1);
        });

        it('should throw ToDoNotFoundException for non-existent todo', () =>
        {
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(undefined);

            expect(useCase.executeAsync('999')).rejects.toThrow(ToDoNotFoundException);
        });
    });
});