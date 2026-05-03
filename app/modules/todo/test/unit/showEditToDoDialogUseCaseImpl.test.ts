import { describe, it, expect, vi, afterEach } from 'vitest';
import { ShowEditToDoDialogUseCaseImpl } from '../../usecases/showEditToDoDialogUseCaseImpl';
import type { ToDosOwner } from '../../interfaces/todosOwner';
import type { ToDo } from '../../interfaces/todo';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';

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
        showEditDialog: vi.fn(),
        toObservableData: vi.fn()
    };
};

describe('ShowEditToDoDialogUseCaseImpl', () =>
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

    const useCase = new ShowEditToDoDialogUseCaseImpl(todosOwner);

    afterEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should show edit dialog for existing todo', async () =>
        {
            const todo = createMockToDo('123');

            todosOwner.getToDoByIdAsync.mockResolvedValue(todo);
            await useCase.executeAsync('123');

            expect(todo.showEditDialog).toHaveBeenCalledTimes(1);
        });

        it('should throw ToDoNotFoundException for non-existent todo', () =>
        {
            todosOwner.getToDoByIdAsync.mockResolvedValue(undefined);

            expect(useCase.executeAsync('999')).rejects.toThrow(ToDoNotFoundException);
        });
    });
});