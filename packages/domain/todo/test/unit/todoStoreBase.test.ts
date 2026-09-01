import { describe, it, expect, beforeEach, vi } from 'vitest';
import { todoRepositoryMock } from '../mocks/todoRepositoryMock';
import { todoFactoryMock } from '../mocks/todoFactoryMock';
import { ToDoStoreBase } from '../../src/entities/todoStoreBase';
import type { ToDoData } from '../../src/types/todoData';
import type { ToDoAddData } from '../../src/types/todoAddData';
import type { ToDoUpdateData } from '../../src/types/todoUpdateData';
import { createToDoMock } from '../mocks/todoMock';
import { delay } from '@client/shared';

function setupStore(): ToDoStoreBase
{
    return new ToDoStoreBase(todoRepositoryMock, todoFactoryMock);
}

beforeEach(() =>
{
    vi.resetAllMocks();
});

describe('initializeToDosAsync', () =>
{
    it('should call initialization in constructor', async () =>
    {
        const mockData: ToDoData[] = [
            {
                id: '1',
                title: 'Task 1',
                description: '',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockData);

        setupStore();

        await delay(0);

        expect(todoRepositoryMock.getAllToDosAsync).toHaveBeenCalledTimes(1);
    });

    it('should load todos from repository', async () =>
    {
        const mockData: ToDoData[] = [
            {
                id: '1',
                title: 'Task 1',
                description: 'Desc 1',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
            {
                id: '2',
                title: 'Task 2',
                description: 'Desc 2',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockData);

        const store = setupStore();
        await store.initializeToDosAsync();

        const todos = store.todos.value;
        expect(todos).toHaveLength(2);
        expect(todos[0]?.id).toBe('1');
        expect(todos[1]?.id).toBe('2');
        expect(todoRepositoryMock.getAllToDosAsync).toHaveBeenCalledTimes(1);
    });

    it('should initialize store only once', async () =>
    {
        const mockData: ToDoData[] = [
            {
                id: '1',
                title: 'Task 1',
                description: '',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockData);

        const store = setupStore();

        await store.initializeToDosAsync();
        await store.initializeToDosAsync();

        expect(todoRepositoryMock.getAllToDosAsync).toHaveBeenCalledTimes(1);
    });
});

describe('updateToDosAsync', () =>
{
    it('should reload todos from repository', async () =>
    {
        const initialData: ToDoData[] = [
            {
                id: '1',
                title: 'Task 1',
                description: '',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];
        const updatedData: ToDoData[] = [
            {
                id: '1',
                title: 'Task 1',
                description: 'Some Description',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];

        todoRepositoryMock.getAllToDosAsync
            .mockResolvedValueOnce(initialData)
            .mockResolvedValueOnce(updatedData);

        const store = setupStore();
        await store.updateToDosAsync();

        const todos = store.todos.value;
        expect(todos).toHaveLength(1);
        expect(todos[0]?.description).toBe(updatedData[0]?.description);
        expect(todoRepositoryMock.getAllToDosAsync).toHaveBeenCalledTimes(2);
    });
});

describe('addToDoAsync', () =>
{
    it('should add todo and update collection', async () =>
    {
        const addData: ToDoAddData = {
            title: 'New Task',
            description: 'New Desc',
            completionDatePlanned: undefined,
        };

        const savedData: ToDoData = {
            id: '1',
            title: 'New Task',
            description: 'New Desc',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        };

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue([]);
        todoRepositoryMock.addToDoAsync.mockResolvedValue(savedData);

        const store = setupStore();
        await store.addToDoAsync(addData);

        expect(todoRepositoryMock.addToDoAsync).toHaveBeenCalledWith(addData);
        expect(todoFactoryMock.create).toHaveBeenCalledWith(savedData);

        const todos = store.todos.value;
        expect(todos).toHaveLength(1);
        expect(todos[0]?.id).toBe('1');
    });
});

describe('updateToDoAsync', () =>
{
    it('should update existing todo and sync collection', async () =>
    {
        const initialData: ToDoData[] = [
            {
                id: '1',
                title: 'Original',
                description: '',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];

        const updateData: ToDoUpdateData = {
            id: '1',
            title: 'Updated',
            description: 'Updated Desc',
            completionDatePlanned: undefined,
        };

        const savedData: ToDoData = {
            id: '1',
            title: 'Updated',
            description: 'Updated Desc',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        };

        const todoMock = createToDoMock(initialData[0]);

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue(initialData);
        todoRepositoryMock.updateToDoAsync.mockResolvedValue(savedData);
        todoFactoryMock.create.mockReturnValue(todoMock);

        const store = setupStore();
        await store.updateToDoAsync(updateData);

        expect(todoRepositoryMock.updateToDoAsync).toHaveBeenCalledWith(updateData);
        expect(todoMock.setData).toHaveBeenCalledWith(savedData);
    });

    it('should add new todo if not found in collection', async () =>
    {
        const todoData: ToDoData = {
            id: '1',
            title: 'Title',
            description: '',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        };

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue([]);

        todoRepositoryMock.updateToDoAsync.mockResolvedValue(todoData);

        const store = setupStore();

        await store.initializeToDosAsync();

        await store.updateToDoAsync({
            id: todoData.id,
            title: todoData.title,
            description: todoData.description,
            completionDatePlanned: todoData.completionDatePlanned,
        });

        const todos = store.todos.value;
        expect(todos).toHaveLength(1);
        expect(todos[0]).toEqual(todoData);
    });
});

describe('getToDoByIdAsync', () =>
{
    it('should return todo data by id', async () =>
    {
        const mockData: ToDoData[] = [
            {
                id: '1',
                title: 'Task 1',
                description: '',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockData);

        const store = setupStore();
        const result = await store.getToDoByIdAsync('1');

        expect(result).toEqual(mockData[0]);
    });

    it('should return undefined for non-existent id', async () =>
    {
        todoRepositoryMock.getAllToDosAsync.mockResolvedValue([]);

        const store = setupStore();

        const result = await store.getToDoByIdAsync('1');

        expect(result).toBeUndefined();
    });
});

describe('getUpdateSchemeAsync', () =>
{
    it('should return scheme for existing todo', async () =>
    {
        const mockData: ToDoData[] = [
            {
                id: '1',
                title: 'Task',
                description: '',
                completionDatePlanned: undefined,
                completionDateActual: undefined
            },
        ];

        const todoMock = createToDoMock(mockData[0]!);

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockData);
        todoFactoryMock.create.mockReturnValue(todoMock);
        todoMock.getUpdateScheme.mockReturnValue({});

        const store = setupStore();
        const scheme = await store.getUpdateSchemeAsync('1');

        expect(scheme).toBeDefined();
    });

    it('should return undefined for non-existent todo', async () =>
    {
        todoRepositoryMock.getAllToDosAsync.mockResolvedValue([]);
        const store = setupStore();

        const scheme = await store.getUpdateSchemeAsync('1');

        expect(scheme).toBeUndefined();
    });
});

describe('tasksQueue chaining', () =>
{
    it('should chain subsequent calls for all data mutation methods', async () =>
    {
        const mockData: ToDoData[] = [
            {
                id: '1',
                title: 'Task 1',
                description: '',
                completionDatePlanned: undefined,
                completionDateActual: undefined,
            },
        ];

        const addedData: ToDoData = {
            id: 'added-1',
            title: 'Added Task',
            description: '',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        };

        const updatedData: ToDoData = {
            id: '1',
            title: 'Updated Task',
            description: '',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        };

        todoRepositoryMock.getAllToDosAsync.mockResolvedValue(mockData);
        todoRepositoryMock.addToDoAsync.mockResolvedValue(addedData);
        todoRepositoryMock.updateToDoAsync.mockResolvedValue(updatedData);

        const store = setupStore();
        const executionOrder = new Array<string>();
        const callPromises: Promise<unknown>[] = [];

        callPromises.push(store.initializeToDosAsync().then(() =>
        {
            executionOrder.push('initializeToDosAsync');
        }));

        callPromises.push(store.updateToDosAsync().then(() =>
        {
            executionOrder.push('updateToDosAsync');
        }));

        callPromises.push(store.addToDoAsync({
            title: 'Task',
            description: '',
            completionDatePlanned: undefined,
        }).then(() =>
        {
            executionOrder.push('addToDoAsync');
        }));

        callPromises.push(store.updateToDoAsync({
            id: '1',
            title: 'Task',
            description: '',
            completionDatePlanned: undefined,
        }).then(() =>
        {
            executionOrder.push('updateToDoAsync');
        }));

        await Promise.all(callPromises);

        expect(executionOrder).toEqual([
            'initializeToDosAsync',
            'updateToDosAsync',
            'addToDoAsync',
            'updateToDoAsync'
        ]);
    });
});