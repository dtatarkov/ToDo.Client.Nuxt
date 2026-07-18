import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createToDoMock } from '../mocks/todoMock';
import { todoRepositoryMock } from '../mocks/todoRepositoryMock';
import { todoFactoryMock } from '../mocks/todoFactoryMock';
import { ToDosOwnerBase } from '../../src/entities/todosOwnerBase';
import { ToDoNotFoundException } from '../../src/exceptions/todoNotFoundException';

describe('ToDosOwnerBase', () =>
{
    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('getAllToDos', () =>
    {
        it('should return array with todos', async () =>
        {
            const mockTodos = [createToDoMock({ id: '1' }), createToDoMock({ id: '2' })];
            todoRepositoryMock.getAllToDosAsync.mockReturnValue(mockTodos);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            await owner.initializeToDosAsync();
            const todos = owner.getAllToDos();

            expect(todos).toEqual(mockTodos);
            expect(todoRepositoryMock.getAllToDosAsync).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateToDosAsync', () =>
    {
        it('should update todos', async () =>
        {
            const initialTodos = [createToDoMock({ id: '1' })];
            const updatedTodos = [createToDoMock({ id: '2' })];

            todoRepositoryMock.getAllToDosAsync
                .mockResolvedValueOnce(initialTodos)
                .mockResolvedValueOnce(updatedTodos);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            await owner.initializeToDosAsync();
            await owner.updateToDosAsync();

            const todos = owner.getAllToDos();
            expect(todos).toEqual(updatedTodos);
            expect(todoRepositoryMock.getAllToDosAsync).toHaveBeenCalledTimes(2);
        });

        it('should initialize if not initialized', async () =>
        {
            const mockTodos = [createToDoMock({ id: '1' })];
            todoRepositoryMock.getAllToDosAsync = vi.fn().mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            await owner.updateToDosAsync();

            const todos = owner.getAllToDos();
            expect(todos).toEqual(mockTodos);
            expect(todoRepositoryMock.getAllToDosAsync).toHaveBeenCalledTimes(1);
        });
    });

    describe('saveToDoAsync', () =>
    {
        it('should save todo', async () =>
        {
            const todo = createToDoMock({ id: '1' });
            const mockTodos = [createToDoMock({ id: '1' })];

            todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            await owner.saveToDoAsync(todo);

            expect(todoRepositoryMock.updateToDoAsync).toHaveBeenCalledWith(todo);
        });

        it('should save new todo and add to list', async () =>
        {
            const newTodo = createToDoMock();
            // The initial list is empty (or doesn't contain this id)
            todoRepositoryMock.getAllToDosAsync.mockResolvedValue([]);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            await owner.saveToDoAsync(newTodo);

            expect(todoRepositoryMock.addToDoAsync).toHaveBeenCalledWith(newTodo);
            // Verify that the todo is added to the internal list
            const todos = owner.getAllToDos();
            expect(todos).toContain(newTodo);
        });

        it('should throw if todo not found', async () =>
        {
            const todo = createToDoMock({ id: '999' });
            const mockTodos = [createToDoMock({ id: '1' })];

            todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            await expect(owner.saveToDoAsync(todo)).rejects.toThrow(ToDoNotFoundException);
        });
    });

    describe('createToDo', () =>
    {
        it('should create a todo using factory', () =>
        {
            const mockTodo = createToDoMock();
            todoFactoryMock.create.mockReturnValue(mockTodo);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            const result = owner.createToDo();

            expect(todoFactoryMock.create).toHaveBeenCalledTimes(1);
            expect(result).toBe(mockTodo);
            expect(result.owner).toBe(owner);
        });
    });

    describe('owner assignment', () =>
    {
        it('should set owner on todos', async () =>
        {
            const todo1 = createToDoMock({ id: '1' });
            const todo2 = createToDoMock({ id: '2' });
            const mockTodos = [todo1, todo2];

            todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockTodos);

            const owner = new ToDosOwnerBase(todoRepositoryMock, todoFactoryMock);
            await owner.initializeToDosAsync();

            expect(todo1.owner).toBe(owner);
            expect(todo2.owner).toBe(owner);
        });
    });
});