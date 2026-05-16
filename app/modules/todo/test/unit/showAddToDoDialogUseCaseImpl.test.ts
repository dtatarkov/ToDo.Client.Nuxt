import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ShowAddToDoDialogUseCaseImpl } from '../../usecases/showAddToDoDialogUseCaseImpl';
import type { ToDosOwner } from '../../interfaces/todosOwner';
import type { ToDo } from '../../interfaces/todo';

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
    const todosOwner = {
        getAllToDos: vi.fn(),
        getToDoByIdAsync: vi.fn(),
        updateToDosAsync: vi.fn(),
        initializeToDosAsync: vi.fn(),
        saveToDoAsync: vi.fn(),
        createToDo: vi.fn()
    } satisfies ToDosOwner;

    const useCase = new ShowAddToDoDialogUseCaseImpl(todosOwner);

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should create a new todo and show edit dialog', () =>
        {
            const todo = createMockToDo();
            todosOwner.createToDo.mockReturnValue(todo);

            useCase.execute();

            expect(todosOwner.createToDo).toHaveBeenCalledTimes(1);
            expect(todo.showEditDialog).toHaveBeenCalledTimes(1);
        });
    });
});