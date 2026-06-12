import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToDoBase } from '../../entities/todoBase';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { formFactoryMock } from '@/modules/forms/mocks/formFactoryMock';
import { formMock } from '@/modules/forms/mocks/formMock';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import { modalMock } from '@/modules/overlay/mocks/modalMock';

describe('ToDoImpl', () =>
{
    let todo: ToDoBase;

    beforeEach(() =>
    {
        vi.resetAllMocks();

        formFactoryMock.create.mockReturnValue(formMock);
        overlayMock.createModal.mockReturnValue(modalMock);

        todo = new ToDoBase(overlayMock, formFactoryMock);
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

    describe('showForm', () =>
    {
        it('should create form and set data from todo', () =>
        {
            todo.id = '123';
            todo.title = 'Test';

            todo.showForm();

            expect(formFactoryMock.create).toHaveBeenCalledTimes(1);
            expect(formMock.setData).toHaveBeenCalledTimes(1);
            expect(formMock.setData).toHaveBeenCalledWith(todo.getData());
        });

        it('should create modal via overlay', () =>
        {
            todo.id = '';

            const result = todo.showForm();

            expect(overlayMock.createModal).toHaveBeenCalledTimes(1);
            expect(result).toBe(modalMock);
        });
    });

    describe('setData', () =>
    {
        it('should set all properties from partial data', () =>
        {
            const id = '42';
            const title = 'Updated Title';
            const description = 'Updated Desc';
            const completionDatePlanned = new Date('2025-06-01');
            const completionDateActual = new Date('2025-06-02');

            todo.setData({
                id,
                title,
                description,
                completionDatePlanned,
                completionDateActual,
            });

            expect(todo.id).toBe('42');
            expect(todo.title).toBe('Updated Title');
            expect(todo.description).toBe('Updated Desc');
            expect(todo.completionDatePlanned).toBe(completionDatePlanned);
            expect(todo.completionDateActual).toBe(completionDateActual);
        });

        it('should set only provided properties and leave others unchanged', () =>
        {
            todo.id = '1';
            todo.title = 'Original Title';
            todo.description = 'Original Desc';

            todo.setData({ title: 'New Title' });

            expect(todo.id).toBe('1');
            expect(todo.title).toBe('New Title');
            expect(todo.description).toBe('Original Desc');
            expect(todo.completionDatePlanned).toBeUndefined();
            expect(todo.completionDateActual).toBeUndefined();
        });

        it('should set completionDatePlanned to undefined', () =>
        {
            todo.completionDatePlanned = new Date('2025-01-01');
            expect(todo.completionDatePlanned).toBeDefined();

            todo.setData({ completionDatePlanned: undefined });

            expect(todo.completionDatePlanned).toBeUndefined();
        });

        it('should set completionDateActual to undefined', () =>
        {
            todo.completionDateActual = new Date('2025-01-01');
            expect(todo.completionDateActual).toBeDefined();

            todo.setData({ completionDateActual: undefined });

            expect(todo.completionDateActual).toBeUndefined();
        });
    });
});