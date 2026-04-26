import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ToDosOwnerBase } from '../../entities/todosOwnerBase';
import { ToDo } from '../../interfaces/todo';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';
import { EffectsContainer } from '@/modules/shared/interfaces/effectsContainer';
import { EffectsContainerBase } from '@/modules/shared/entities/effectsContainerBase';
import { DestroyedException } from '@/modules/shared/exceptions/destroyedException';
import { ObservableSource } from '@/modules/shared/entities/observableSource';

// Simple mock ToDo
const createMockToDo = (id: string, title: string = 'Test', description: string = 'Description'): ToDo =>
{
    return {
        id,
        title,
        description,
        completionDatePlanned: undefined,
        completionDateActual: undefined,
        owner: undefined,
        data: new ObservableSource({ id, title, description, completionDatePlanned: undefined, completionDateActual: undefined }),
        getData: vi.fn(),
        clone: vi.fn(),
        saveAsync: vi.fn(),
        showEditDialog: vi.fn()
    };
};

describe('ToDosOwnerBase', () =>
{
    const mockRepository = {
        getAllToDosAsync: vi.fn(),
        saveToDoAsync: vi.fn()
    };

    beforeEach(() =>
    {
        mockRepository.getAllToDosAsync.mockReset();
        mockRepository.saveToDoAsync.mockReset();
    });

    describe('getAllToDosAsync', () =>
    {
        it('should return observable with todos', async () =>
        {
            const mockTodos = [createMockToDo('1'), createMockToDo('2')];
            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository);
            const observable = await owner.getAllToDosAsync();

            expect(observable).toBeDefined();
            expect(observable.value).toEqual(mockTodos);
            expect(mockRepository.getAllToDosAsync).toHaveBeenCalledTimes(1);
        });

        it('should throw if destroyed', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository);
            owner.destroy();

            await expect(owner.getAllToDosAsync()).rejects.toThrow(DestroyedException);
        });

        it('should initialize only once', async () =>
        {
            const mockTodos = [createMockToDo('1')];
            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository);
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
            const initialTodos = [createMockToDo('1')];
            const updatedTodos = [createMockToDo('2')];

            mockRepository.getAllToDosAsync
                .mockResolvedValueOnce(initialTodos)
                .mockResolvedValueOnce(updatedTodos);

            const owner = new ToDosOwnerBase(mockRepository);
            await owner.getAllToDosAsync();
            await owner.updateToDosAsync();

            const observable = await owner.getAllToDosAsync();
            expect(observable.value).toEqual(updatedTodos);
            expect(mockRepository.getAllToDosAsync).toHaveBeenCalledTimes(2);
        });

        it('should initialize if not initialized', async () =>
        {
            const mockTodos = [createMockToDo('1')];
            mockRepository.getAllToDosAsync = vi.fn().mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository);
            await owner.updateToDosAsync();

            const observable = await owner.getAllToDosAsync();
            expect(observable.value).toEqual(mockTodos);
            expect(mockRepository.getAllToDosAsync).toHaveBeenCalledTimes(1);
        });

        it('should throw if destroyed', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository);
            owner.destroy();

            await expect(owner.updateToDosAsync()).rejects.toThrow(DestroyedException);
        });
    });

    describe('saveToDoAsync', () =>
    {
        it('should save todo', async () =>
        {
            const todo = createMockToDo('1');
            const mockTodos = [createMockToDo('1')];

            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository);
            await owner.saveToDoAsync(todo);

            expect(mockRepository.saveToDoAsync).toHaveBeenCalledWith(todo);
        });

        it('should throw if todo not found', async () =>
        {
            const todo = createMockToDo('999');
            const mockTodos = [createMockToDo('1')];

            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository);
            await expect(owner.saveToDoAsync(todo)).rejects.toThrow(ToDoNotFoundException);
        });

        it('should throw if destroyed', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository);
            owner.destroy();

            const todo = createMockToDo('1');

            await expect(owner.saveToDoAsync(todo)).rejects.toThrow(DestroyedException);
        });
    });

    describe('destroy', () =>
    {
        it('should prevent operations after destroy', async () =>
        {
            const owner = new ToDosOwnerBase(mockRepository);
            owner.destroy();

            await expect(owner.getAllToDosAsync()).rejects.toThrow(DestroyedException);
            await expect(owner.saveToDoAsync(createMockToDo('1'))).rejects.toThrow(DestroyedException);
            await expect(owner.updateToDosAsync()).rejects.toThrow(DestroyedException);
        });

        it('should be idempotent', () =>
        {
            const owner = new ToDosOwnerBase(mockRepository);
            owner.destroy();
            expect(() => owner.destroy()).not.toThrow();
        });
    });

    describe('owner assignment', () =>
    {
        it('should set owner on todos', async () =>
        {
            const todo1 = createMockToDo('1');
            const todo2 = createMockToDo('2');
            const mockTodos = [todo1, todo2];

            mockRepository.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(mockRepository);
            await owner.getAllToDosAsync();

            expect(todo1.owner).toBe(owner);
            expect(todo2.owner).toBe(owner);
        });
    });
});