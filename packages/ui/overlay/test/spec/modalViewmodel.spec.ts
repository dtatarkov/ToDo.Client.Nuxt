import { it, expect } from 'vitest';
import { ModalViewmodelsFactoryImpl } from '../../src/factories/modalViewmodelsFactoryImpl';
import { UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';
import { FormViewmodelFactoryImpl, FormElementViewmodelsFactoryImpl, FormConfiguration } from '@client/ui-forms';
import { AsyncCommandGeneric } from '@client/shared';
import { MessagesServiceImpl } from '@client/infrastructure-messages';
import { InputType } from '@client/ui-uikit';

it('modal example', async () =>
{
    const uikitFactory = new UIKitViewmodelsFactoryImpl();

    // Content: a form viewmodel
    const formFactory = new FormViewmodelFactoryImpl(
        new FormElementViewmodelsFactoryImpl(uikitFactory)
    );

    const form = formFactory.create(
        new FormConfiguration<{ title: string; }>({
            title: { inputType: InputType.inputText, labelKey: 'todo.field.title.label' },
        }),
        { submit: async () => { } }
    );

    const messagesService = new MessagesServiceImpl((key) => key);

    // Modal via factory + configuration object
    const modal = new ModalViewmodelsFactoryImpl(uikitFactory, messagesService)
        .create({
            title: 'todo.modal.create.title',
            description: '...',
            content: form,
            buttonConfirm: configurator =>
                configurator
                    .withCommand(new AsyncCommandGeneric(async () => { }))
                    .asCreateButton(),
            buttonCancel: true,
        });

    // State access
    expect(modal.state.value.title).toBe('todo.modal.create.title');
    expect(modal.state.value.buttonConfirm).toBeDefined();
    expect(modal.state.value.buttonCancel).toBeDefined();
    expect(modal.state.value.isDisabled).toBe(false);

    // Content access
    expect(modal.state.value.content).toBe(form.state.value);
});