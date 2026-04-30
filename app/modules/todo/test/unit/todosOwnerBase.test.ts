import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToDosOwnerBase } from '../../entities/todosOwnerBase';
import { ToDo, type ToDoData } from '../../interfaces/todo';
import { ToDoFactory } from '../../interfaces/todoFactory';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';
import { DestroyedException } from '@/modules/shared/exceptions/destroyedException';

// Simple mock ToDo
const createMockToDo = (
    data: Partial<ToDoData> = {}
): ToDo =>
{
    const defaultData: ToDoData = {
        id: '',
        title: 'Test',
        description: 'Description',
        completionDatePlanned: undefined,
        completionDateActual: undefined,
    };

    const mergedData = { ...defaultData, ...data };

    return {
        id: mergedData.id,
        title: mergedData.title,
        description: mergedData.description,
        completionDatePlanned: mergedData.completionDatePlanned,
        completionDateActual: mergedData.completionDateActual,
        owner: undefined,
        isNew: mergedData.id == '',
        getData: vi.fn(),
        clone: vi.fn(),
        saveAsync: vi.fn(),
        showEditDialog: vi.fn(),
        toObservableData: vi.fn(),
    };
};

describe('ToDosOwnerBase', () =>
{
    const mockRepository = {
        getAllToDosAsync: vi.fn(),
        saveToDoAsync: vi.fn()
    };

    const mockTodoFactory = {
        create: vi.fn()
    };

    beforeEach(() =>
    {
        mockRepository.getAllToDosAsync.mockReset();
        mockRepository.saveToDoAsync.mockReset();
        mockTodoFactory.create.mockReset();
    });

    describe('getAllToDosAsync', () =>
    {
        it('should return observable with todos', async () =>
        {
            const mockTodos = [createMockToDo({ id: '1' }), createMockToDo({ id: '2' })];
            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            const observable = await owner.getAllToDosAsync();

            expect(observable).toBeDefined();
            expect(observable.value).toEqual(mockTodos);
            expect(mockRepository.getAllToDosAsync).toHaveBeenCalledTimes(1);
        });

        it('should throw if destroyed', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            owner.destroy();

            await expect(owner.getAllToDosAsync()).rejects.toThrow(DestroyedException);
        });

        it('should initialize only once', async () =>
        {
            const mockTodos = [createMockToDo({ id: '1' })];
            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            await owner.getAllToDosAsync();
            await owner.getAllToDosAsync();
            await owner.getAllToDosAsync();

            expect(mockRepository.getAllToDosAsync).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateToDosAsync', () =>
    {
        it('should update todos', async () =>
        {
            const initialTodos = [createMockToDo({ id: '1' })];
            const updatedTodos = [createMockToDo({ id: '2' })];

            mockRepository.getAllToDosAsync
                .mockResolvedValueOnce(initialTodos)
                .mockResolvedValueOnce(updatedTodos);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            await owner.getAllToDosAsync();
            await owner.updateToDosAsync();

            const observable = await owner.getAllToDosAsync();
            expect(observable.value).toEqual(updatedTodos);
            expect(mockRepository.getAllToDosAsync).toHaveBeenCalledTimes(2);
        });

        it('should initialize if not initialized', async () =>
        {
            const mockTodos = [createMockToDo({ id: '1' })];
            mockRepository.getAllToDosAsync = vi.fn().mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            await owner.updateToDosAsync();

            const observable = await owner.getAllToDosAsync();
            expect(observable.value).toEqual(mockTodos);
            expect(mockRepository.getAllToDosAsync).toHaveBeenCalledTimes(1);
        });

        it('should throw if destroyed', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            owner.destroy();

            await expect(owner.updateToDosAsync()).rejects.toThrow(DestroyedException);
        });
    });

    describe('saveToDoAsync', () =>
    {
        it('should save todo', async () =>
        {
            const todo = createMockToDo({ id: '1' });
            const mockTodos = [createMockToDo({ id: '1' })];

            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            await owner.saveToDoAsync(todo);

            expect(mockRepository.saveToDoAsync).toHaveBeenCalledWith(todo);
        });

        it('should save new todo and add to list', async () =>
        {
            const newTodo = createMockToDo();
            // The initial list is empty (or doesn't contain this id)
            mockRepository.getAllToDosAsync.mockResolvedValue([]);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            await owner.saveToDoAsync(newTodo);

            expect(mockRepository.saveToDoAsync).toHaveBeenCalledWith(newTodo);
            // Verify that the todo is added to the internal list
            const todosObservable = await owner.getAllToDosAsync();
            expect(todosObservable.value).toContain(newTodo);
        });

        it('should throw if todo not found', async () =>
        {
            const todo = createMockToDo({ id: '999' });
            const mockTodos = [createMockToDo({ id: '1' })];

            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            await expect(owner.saveToDoAsync(todo)).rejects.toThrow(ToDoNotFoundException);
        });

        it('should throw if destroyed', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            owner.destroy();

            const todo = createMockToDo({ id: '1' });

            await expect(owner.saveToDoAsync(todo)).rejects.toThrow(DestroyedException);
        });
    });

    describe('createToDo', () =>
    {
        it('should create a todo using factory', () =>
        {
            const mockTodo = createMockToDo();
            mockTodoFactory.create.mockReturnValue(mockTodo);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            const result = owner.createToDo();

            expect(mockTodoFactory.create).toHaveBeenCalledTimes(1);
            expect(result).toBe(mockTodo);
            expect(result.owner).toBe(owner);
        });

        it('should throw if destroyed', () =>
        {
            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            owner.destroy();

            expect(() => owner.createToDo()).toThrow(DestroyedException);
        });
    });

    describe('destroy', () =>
    {
        it('should prevent operations after destroy', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            owner.destroy();

            await expect(owner.getAllToDosAsync()).rejects.toThrow(DestroyedException);
            await expect(owner.saveToDoAsync(createMockToDo({ id: '1' }))).rejects.toThrow(DestroyedException);
            await expect(owner.updateToDosAsync()).rejects.toThrow(DestroyedException);
        });

        it('should be idempotent', () =>
        {
            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            owner.destroy();
            expect(() => owner.destroy()).not.toThrow();
        });
    });

    describe('owner assignment', () =>
    {
        it('should set owner on todos', async () =>
        {
            const todo1 = createMockToDo({ id: '1' });
            const todo2 = createMockToDo({ id: '2' });
            const mockTodos = [todo1, todo2];

            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository, mockTodoFactory);
            await owner.getAllToDosAsync();

            expect(todo1.owner).toBe(owner);
            expect(todo2.owner).toBe(owner);
        });
    });
});