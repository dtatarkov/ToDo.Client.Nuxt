import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToDosWidgetViewmodelImpl } from '../../src/viewmodels/todosWidgetViewmodelImpl';
import { todosStoreMock } from '../../../../domain/todo/test/mocks/todosStoreMock';
import { createToDoMock } from '../../../../domain/todo/test/mocks/todoMock';
import { buttonGeneralViewmodelMock, uiKitViewmodelsFactoryMock } from '@client/ui-uikit/mocks';

describe('ToDosWidgetViewmodelImpl', () =>
{
    let viewmodel: ToDosWidgetViewmodelImpl;

    beforeEach(() =>
    {
        vi.clearAllMocks();
        uiKitViewmodelsFactoryMock.createButtonGeneral.mockReturnValue(buttonGeneralViewmodelMock);
        viewmodel = new ToDosWidgetViewmodelImpl(todosStoreMock, uiKitViewmodelsFactoryMock);
    });

    describe('state', () =>
    {
        it('should initialize with empty cards array', () =>
        {
            expect(viewmodel.state.value.cards).toEqual([]);
        });

        it('should initialize with addToDoButton in state', () =>
        {
            expect(buttonGeneralViewmodelMock.setTitle).toBeCalledWith('todos.toolbar.buttons.add');
            expect(viewmodel.state.value.addToDoButton).toBeDefined();
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