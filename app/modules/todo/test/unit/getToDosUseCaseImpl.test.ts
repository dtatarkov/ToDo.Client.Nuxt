import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetToDosUseCaseImpl } from '../../usecases/getToDosUseCaseImpl';
import type { ToDosOwner } from '../../interfaces/todosOwner';
import type { ToDo } from '../../interfaces/todo';
import { ObservableSource } from '@/modules/shared/entities/observableSource';

// Mock ToDo
const createMockToDo = (id: string = '1') =>
{
    return {
        id,
        title: 'Test ToDo',
        description: 'Test Description',
        completionDatePlanned: undefined,
        completionDateActual: undefined,
        owner: undefined,
        isNew: id === '',

        getData: () => ({
            id,
            title: 'Test ToDo',
            description: 'Test Description',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        }),

        clone: vi.fn(),
        saveAsync: vi.fn(),
        showEditDialog: vi.fn(),
        toObservableData: vi.fn()
    } satisfies ToDo;
};

describe('GetToDosUseCaseImpl', () =>
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

    const useCase = new GetToDosUseCaseImpl(todosOwner);

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('execute', () =>
    {
        it('should return observable with todos', () =>
        {
            const todo = createMockToDo('123');

            todosOwner.getAllToDos.mockReturnValue(new ObservableSource([todo]));

            const result = useCase.execute();

            expect(result).toBeDefined();
            expect(result.value).toHaveLength(1);
            console.log('value', result.value);
            expect(result.value[0]?.id).toBe('123');
        });
    });
});