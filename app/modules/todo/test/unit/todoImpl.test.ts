import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToDoBase } from '../../entities/todoBase';
import { StringsServiceImpl } from '@/modules/shared/services/stringsServiceImpl';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';

const stringsService = new StringsServiceImpl();

describe('ToDoImpl', () =>
{
    let todo: ToDoBase;

    beforeEach(() =>
    {
        vi.resetAllMocks();

        todo = new ToDoBase(stringsService);
    });

    describe('properties', () =>
    {
        it('should have default empty values', () =>
        {
            expect(todo.id).toBe('');
            expect(todo.title).toBe('');
            expect(todo.description).toBe('');
            expect(todo.completionDatePlanned).toBeUndefined();
            expect(todo.completionDateActual).toBeUndefined();
            expect(todo.owner).toBeUndefined();
        });
    });

    describe('isNew', () =>
    {
        it('should be true when id is empty', () =>
        {
            todo.id = '';
            expect(todo.isNew).toBe(true);
        });

        it('should be false when id is not empty', () =>
        {
            todo.id = 'some-id';
            expect(todo.isNew).toBe(false);
        });
    });

    describe('getData', () =>
    {
        it('should return current data', () =>
        {
            todo.id = '123';
            todo.title = 'Title';
            todo.description = 'Desc';
            todo.completionDatePlanned = new Date('2025-01-01');

            const data = todo.getData();

            expect(data).toEqual({
                id: '123',
                title: 'Title',
                description: 'Desc',
                completionDatePlanned: new Date('2025-01-01'),
                completionDateActual: undefined,
            });
        });
    });

    describe('clone', () =>
    {
        it('should create a new instance with same data', () =>
        {
            todo.id = '1';
            todo.title = 'Original';
            todo.description = 'Desc';
            todo.completionDatePlanned = new Date('2025-01-01');
            todo.owner = todosOwnerMock;

            const clone = todo.clone();

            expect(clone).toBeInstanceOf(ToDoBase);
            expect(clone.id).toBe('1');
            expect(clone.title).toBe('Original');
            expect(clone.description).toBe('Desc');
            expect(clone.completionDatePlanned).toEqual(new Date('2025-01-01'));
            expect(clone.owner).toBe(todosOwnerMock);
        });

        it('should not share internal data references', () =>
        {
            todo.title = 'Original';
            const clone = todo.clone();
            clone.title = 'Modified';
            expect(todo.title).toBe('Original');
        });
    });

    describe('saveAsync', () =>
    {
        it('should call owner.saveToDoAsync with itself', async () =>
        {
            todo.owner = todosOwnerMock;

            await todo.saveAsync();
            expect(todosOwnerMock.saveToDoAsync).toHaveBeenCalledTimes(1);
            expect(todosOwnerMock.saveToDoAsync).toHaveBeenCalledWith(todo);
        });

        it('should throw if owner is undefined', async () =>
        {
            todo.owner = undefined;
            await expect(todo.saveAsync()).rejects.toThrow();
        });
    });
});