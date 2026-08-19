import { it } from 'vitest';
import type { ToDoData } from '@client/domain-todo';
import { EntityScheme } from '@client/infrastructure-entity-schemes';
import { FormElementViewmodelsFactoryImpl, FormViewmodelFactoryImpl } from '@client/ui-forms';
import { UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';
import { createToDoFormConfiguration } from '@client/ui-todo';

/**
 * Spec — the full ToDo form construction API demonstrated in one place.
 */
it('todo form example', async () =>
{
    // --- Scheme (inlined until the ToDo entity provides it) ---
    const todoScheme = EntityScheme.create(scheme => ({
        id: scheme.string().withDefault(''),
        title: scheme.string().required('todo.field.title.errors.empty'),
        description: scheme.string().withDefault(''),
        completionDatePlanned: scheme.datetime(),
        completionDateActual: scheme.datetime(),
    }));

    // --- Configuration: scheme-aware, over the full ToDoData ---
    const configuration = createToDoFormConfiguration(todoScheme);

    // --- Form viewmodel via real factories (no DI container) ---
    const formViewmodelFactory = new FormViewmodelFactoryImpl(
        new FormElementViewmodelsFactoryImpl(new UIKitViewmodelsFactoryImpl())
    );

    const form = formViewmodelFactory.create(configuration, {
        // submit receives the complete ToDoData, including hidden fields
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        submit: async (data: ToDoData) =>
        {
            // handle the submitted entity
        },
    });

    // --- Initial data: all ToDoData fields (id / completionDateActual are hidden) ---
    form.setData({
        id: 'todo-1',
        title: 'Test ToDo',
        description: 'Test description',
        completionDatePlanned: new Date('2026-07-20'),
        completionDateActual: new Date('2026-07-21'),
    });

    // --- Validation messages: Partial<Record<keyof ToDoData, ValidationMessage[]>> ---
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    form.onValidationError(messages =>
    {
        // e.g. messages.title → [ValidationMessage('todo.field.title.errors.required')]
    });

    // --- Submit (form vm entry point; delegates to submitCommand.executeAsync) ---
    await form.submitAsync();
});
