import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToDosWidgetViewmodelImpl } from '../../src/viewmodels/todosWidgetViewmodelImpl';
import { todosStoreMock } from '../../../../domain/todo/test/mocks/todosStoreMock';
import { createToDoMock } from '../../../../domain/todo/test/mocks/todoMock';

describe('ToDosWidgetViewmodelImpl', () =>
{
    let viewmodel: ToDosWidgetViewmodelImpl;

    beforeEach(() =>
    {
        vi.clearAllMocks();
        viewmodel = new ToDosWidgetViewmodelImpl(todosStoreMock);
    });

    describe('addToDoButtonLabelKey', () =>
    {
        it('should return the correct button label key', () =>
        {
            expect(viewmodel.addToDoButtonLabelKey).toBe('todos.toolbar.buttons.add');
        });
    });

    describe('state', () =>
    {
        it('should initialize with empty cards array', () =>
        {
            expect(viewmodel.state.value).toEqual({ cards: [] });
        });
    });

    describe('initializeAsync', () =>
    {
        it('should initialize once and update cards from store', async () =>
        {
            const mockTodos = [
                createToDoMock({ id: '1', title: 'Task 1', description: 'Desc 1' }),
                createToDoMock({ id: '2', title: 'Task 2', description: 'Desc 2' })
            ];

            todosStoreMock.todos.setMockValue(mockTodos);

            await viewmodel.initializeAsync();

            expect(todosStoreMock.initializeToDosAsync).toHaveBeenCalledTimes(1);
            expect(viewmodel.state.value.cards).toHaveLength(2);
        });

        it('should not reinitialize if already initialized', async () =>
        {
            const mockTodos = [
                createToDoMock({ id: '1', title: 'Task 1', description: 'Desc 1' })
            ];

            todosStoreMock.todos.setMockValue(mockTodos);

            await viewmodel.initializeAsync();
            await viewmodel.initializeAsync();

            expect(todosStoreMock.initializeToDosAsync).toHaveBeenCalledTimes(1);
        });
    });
});
