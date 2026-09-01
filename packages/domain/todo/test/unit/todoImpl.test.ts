import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToDoBase } from '../../src/entities/todoBase';

let todo: ToDoBase;

beforeEach(() =>
{
    vi.resetAllMocks();
    todo = new ToDoBase();
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
        todo.completionDateActual = new Date('2026-01-01');

        const data = todo.getData();

        expect(data).toEqual({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            completionDatePlanned: todo.completionDatePlanned,
            completionDateActual: todo.completionDateActual,
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
        todo.completionDateActual = new Date('2026-01-01');

        const clone = todo.clone();

        expect(clone.id).toBe(todo.id);
        expect(clone.title).toBe(todo.title);
        expect(clone.description).toBe(todo.description);
        expect(clone.completionDatePlanned).toEqual(todo.completionDatePlanned);
        expect(clone.completionDateActual).toEqual(todo.completionDateActual);
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

        expect(todo.id).toBe(id);
        expect(todo.title).toBe(title);
        expect(todo.description).toBe(description);
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
});

describe('getAddScheme', () =>
{
    it('should pass validation with valid add data', () =>
    {
        const scheme = ToDoBase.getAddScheme();

        const errors = scheme.validate({
            title: 'Task',
            description: 'Desc',
            completionDatePlanned: new Date('2025-01-01')
        });

        expect(errors).toEqual({});
    });

    it('should pass validation when completionDatePlanned is undefined', () =>
    {
        const scheme = ToDoBase.getAddScheme();

        const errors = scheme.validate({
            title: 'Task',
            description: 'Desc',
            completionDatePlanned: undefined
        });

        expect(errors).toEqual({});
    });

    // it('should fail validation when title is empty', () =>
    // {
    //     const scheme = ToDoBase.getAddScheme();

    //     const errors = scheme.validate({
    //         title: '',
    //         description: 'Desc'
    //     });

    //     expect(errors.title).toBeDefined();
    // });

    it('should fail validation when title is missing', () =>
    {
        const scheme = ToDoBase.getAddScheme();

        const errors = scheme.validate({
            description: 'Desc'
        });

        expect(errors.title).toBeDefined();
    });
});

describe('getUpdateScheme', () =>
{
    it('should pass validation with valid update data', () =>
    {
        const scheme = todo.getUpdateScheme();

        const errors = scheme.validate({
            id: '1',
            title: 'Updated',
            description: 'Desc',
            completionDatePlanned: new Date('2025-01-01')
        });

        expect(errors).toEqual({});
    });

    it('should pass validation when completionDatePlanned is undefined', () =>
    {
        const scheme = todo.getUpdateScheme();

        const errors = scheme.validate({
            id: '1',
            title: 'Updated',
            description: 'Desc',
            completionDatePlanned: undefined
        });

        expect(errors).toEqual({});
    });

    // it('should fail validation when title is empty', () =>
    // {
    //     const scheme = todo.getUpdateScheme();

    //     const errors = scheme.validate({
    //         id: '1',
    //         title: '',
    //         description: 'Desc'
    //     });

    //     expect(errors.title).toBeDefined();
    //     expect(errors.title!.length).toBeGreaterThan(0);
    // });

    it('should fail validation when id is missing', () =>
    {
        const scheme = todo.getUpdateScheme();

        const errors = scheme.validate({
            title: 'Updated',
            description: 'Desc'
        });

        expect(errors.id).toBeDefined();
    });
});
