import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToDoImpl } from '../../entities/todoImpl';
import type { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import type { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import type { ToDosOwner } from '../../interfaces/todosOwner';
import { StringsServiceImpl } from '@/modules/shared/services/stringsServiceImpl';

// Mock dependencies
const mockFormFactory = {
    create: vi.fn(),
} satisfies FormViewmodelFactory;

const mockOverlayService = {
    createModalBase: vi.fn(),
    createModalAddForm: vi.fn(),
    createModalEditForm: vi.fn(),
    getElements: vi.fn(),
} satisfies OverlayService;

const stringsService = new StringsServiceImpl();

const mockOwner = {
    createToDo: vi.fn(),
    saveToDoAsync: vi.fn(),
    getAllToDosAsync: vi.fn(),
    updateToDosAsync: vi.fn(),
} satisfies ToDosOwner;

describe('ToDoImpl', () =>
{
    let todo: ToDoImpl;

    beforeEach(() =>
    {
        vi.resetAllMocks();

        todo = new ToDoImpl(mockFormFactory, mockOverlayService, stringsService);
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

    describe('toObservableData', () =>
    {
        it('should return observable', () =>
        {
            const observable = todo.toObservableData();
            expect(observable).toBeDefined();
            expect(observable.value).toEqual(todo.getData());
        });

        it('observable should reflect updates', () =>
        {
            const observable = todo.toObservableData();
            todo.title = 'Updated';
            expect(observable.value.title).toBe('Updated');
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
            todo.owner = mockOwner;

            const clone = todo.clone();

            expect(clone).toBeInstanceOf(ToDoImpl);
            expect(clone.id).toBe('1');
            expect(clone.title).toBe('Original');
            expect(clone.description).toBe('Desc');
            expect(clone.completionDatePlanned).toEqual(new Date('2025-01-01'));
            expect(clone.owner).toBe(mockOwner);
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
            todo.owner = mockOwner;

            await todo.saveAsync();
            expect(mockOwner.saveToDoAsync).toHaveBeenCalledTimes(1);
            expect(mockOwner.saveToDoAsync).toHaveBeenCalledWith(todo);
        });

        it('should throw if owner is undefined', async () =>
        {
            todo.owner = undefined;
            await expect(todo.saveAsync()).rejects.toThrow();
        });
    });

    describe('showEditDialog', () =>
    {
        it('should create form and modal', () =>
        {
            const mockForm = { setElements: vi.fn(), setData: vi.fn() };
            const mockModal = { title: '', content: null as any };
            mockFormFactory.create.mockReturnValue(mockForm);
            mockOverlayService.createModalEditForm.mockReturnValue(mockModal);

            todo.showEditDialog();

            expect(mockFormFactory.create).toHaveBeenCalledTimes(1);
            expect(mockForm.setElements).toHaveBeenCalledTimes(1);
            expect(mockForm.setData).toHaveBeenCalledWith(todo);
            expect(mockOverlayService.createModalEditForm).toHaveBeenCalledWith(mockForm);
            expect(mockModal.content).toBe(mockForm);
        });
    });
});