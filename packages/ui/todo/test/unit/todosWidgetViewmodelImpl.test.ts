import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToDosWidgetViewmodelImpl } from '../../src/viewmodels/todosWidgetViewmodelImpl';
import { todoStoreMock } from '@client/domain-todo/mocks';
import { createButtonGeneralViewmodelMock, uiKitViewmodelsFactoryMock } from '@client/ui-uikit/mocks';
import { formViewmodelMock, formViewmodelFactoryMock } from '@client/ui-forms/mocks';
import { overlayMock } from '@client/ui-overlay/mocks';
import { todoToCardMapperMock } from '../mocks';
import { ToDoNotFoundException, type ToDoData } from '@client/domain-todo';
import type { MessageKey } from '@client/infrastructure-messages';
import { entitySchemeMock } from '../../../../infrastructure/entitySchemes/test/mocks/entitySchemeMock';

function setupViewmodel(): ToDosWidgetViewmodelImpl
{
    return new ToDosWidgetViewmodelImpl(
        todoStoreMock,
        uiKitViewmodelsFactoryMock,
        formViewmodelFactoryMock,
        overlayMock,
        todoToCardMapperMock,
    );
}

beforeEach(() =>
{
    vi.resetAllMocks();
    uiKitViewmodelsFactoryMock.createButtonGeneral.mockImplementation(() => createButtonGeneralViewmodelMock());
    todoToCardMapperMock.map.mockImplementation(data => data);
});

describe('constructor', () =>
{
    it('should initialize with empty cards array', () =>
    {
        const viewmodel = setupViewmodel();
        expect(viewmodel.state.value.cards).toEqual([]);
    });

    it('should initialize addToDoButton', () =>
    {
        const addToDoButtonMock = createButtonGeneralViewmodelMock();
        uiKitViewmodelsFactoryMock.createButtonGeneral.mockReturnValue(addToDoButtonMock);

        setupViewmodel();

        expect(addToDoButtonMock.setTitle).toBeCalledWith(<MessageKey>'todos.toolbar.buttons.add');
    });
});

describe('side effects', () =>
{
    it('should update cards when store todos change', () =>
    {
        const newToDo: ToDoData =
        {
            id: '1',
            title: 'Task 1',
            description: 'Desc 1',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        };

        todoStoreMock.todos.on.mockImplementation(fn =>
        {
            fn([newToDo]);
        });

        const viewmodel = setupViewmodel();

        expect(viewmodel.state.value.cards).toHaveLength(1);
        expect(viewmodel.state.value.cards[0]!.id).toBe(newToDo.id);
    });
});

describe('createToDo', () =>
{
    it('should open modal with add form', () =>
    {
        formViewmodelFactoryMock.create.mockReturnValue(formViewmodelMock);

        const viewmodel = setupViewmodel();
        viewmodel.createToDo();

        expect(overlayMock.createModal).toHaveBeenCalledWith(expect.objectContaining({
            content: formViewmodelMock
        }));
    });
});

describe('editToDo', () =>
{
    it('should open modal with edit form for existing todo', async () =>
    {
        formViewmodelFactoryMock.create.mockReturnValue(formViewmodelMock);

        const viewmodel = setupViewmodel();

        const mockTodo: ToDoData = {
            id: '1',
            title: 'Task 1',
            description: 'Desc 1',
            completionDatePlanned: undefined,
            completionDateActual: undefined,
        };

        todoStoreMock.getToDoByIdAsync.mockResolvedValue(mockTodo);
        todoStoreMock.getUpdateSchemeAsync.mockResolvedValue(entitySchemeMock);

        await viewmodel.editToDoAsync(mockTodo.id);

        expect(overlayMock.createModal).toHaveBeenCalledWith(expect.objectContaining({
            content: formViewmodelMock
        }));
    });

    it('should do nothing if todo not found', async () =>
    {
        const viewmodel = setupViewmodel();
        todoStoreMock.getToDoByIdAsync.mockResolvedValue(undefined);

        expect(viewmodel.editToDoAsync('1')).rejects.toThrow(ToDoNotFoundException);
    });
});