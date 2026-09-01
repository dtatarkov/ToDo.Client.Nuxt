import { it, beforeEach, vi } from 'vitest';
import type { ToDoAddData, ToDoData, ToDoUpdateData } from '@client/domain-todo';
import { ToDosStoreBase, ToDoFactoryImpl, ToDoNotFoundException } from '@client/domain-todo';
import { todoRepositoryMock } from '@client/domain-todo/mocks';
import { FormElementViewmodelsFactoryImpl, FormViewmodelFactoryImpl } from '@client/ui-forms';
import { UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';
import { createToDoAddFormConfiguration, createToDoUpdateFormConfiguration } from '@client/ui-todo';

beforeEach(() =>
{
    vi.resetAllMocks();
});

/**
 * Spec — the full ToDo form construction API demonstrated in one place.
 */
it('todo add form example', async () =>
{
    todoRepositoryMock.getAllToDosAsync.mockReturnValue([]);

    const store = new ToDosStoreBase(todoRepositoryMock, new ToDoFactoryImpl());
    const configuration = createToDoAddFormConfiguration(store.getAddScheme());

    const formViewmodelFactory = new FormViewmodelFactoryImpl(
        new FormElementViewmodelsFactoryImpl(new UIKitViewmodelsFactoryImpl())
    );

    const form = formViewmodelFactory.create(configuration, {
        submit: async (_data: ToDoAddData) =>
        {
            // handle the submitted entity
        },
    });

    form.setData({
        title: 'Test ToDo',
        description: 'Test description',
        completionDatePlanned: new Date('2026-07-20'),
    });

    form.onValidationError(_messages =>
    {
        // e.g. messages.title → [ValidationMessage('todo.field.title.errors.required')]
    });

    await form.submitAsync();
});

it('todo update form example', async () =>
{
    const id = '1';

    todoRepositoryMock.getAllToDosAsync.mockReturnValue(<ToDoData[]>[
        {
            id,
            title: '',
            description: '',
        }
    ]);

    const store = new ToDosStoreBase(todoRepositoryMock, new ToDoFactoryImpl());
    const todoData = await store.getToDoByIdAsync(id);
    const scheme = await store.getUpdateSchemeAsync(id);

    if (!todoData || !scheme)
    {
        throw new ToDoNotFoundException(id);
    }

    const configuration = createToDoUpdateFormConfiguration(scheme);

    const formViewmodelFactory = new FormViewmodelFactoryImpl(
        new FormElementViewmodelsFactoryImpl(new UIKitViewmodelsFactoryImpl())
    );

    const form = formViewmodelFactory.create(configuration, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        submit: async (data: ToDoUpdateData) =>
        {
            // handle the submitted entity
        },
    });

    form.setData(todoData);

    form.onValidationError(_messages =>
    {
        // e.g. messages.title → [ValidationMessage('todo.field.title.errors.required')]
    });

    await form.submitAsync();
});