import { it, expect } from 'vitest';
import { ModalViewmodelsFactoryImpl } from '../../src/factories/modalViewmodelsFactoryImpl';
import { UIKitViewmodelsFactoryImpl } from '@client/ui-uikit';
import { FormViewmodelFactoryImpl, FormElementViewmodelsFactoryImpl, FormConfiguration } from '@client/ui-forms';
import { InputType } from '@client/ui-uikit';
import { OverlayBase } from '../../src/entities/overlayBase';

it('Overlay API', async () =>
{
    const uikitFactory = new UIKitViewmodelsFactoryImpl();
    const modalFactory = new ModalViewmodelsFactoryImpl(uikitFactory);
    const overlay = new OverlayBase(modalFactory);

    // Content: a form viewmodel
    const formFactory = new FormViewmodelFactoryImpl(
        new FormElementViewmodelsFactoryImpl(uikitFactory)
    );

    const form = formFactory.create(
        new FormConfiguration<{ title: string; }>({
            title: {
                inputType: InputType.inputText,
                labelKey: 'todo.field.title.label'
            },
        }),
        { submit: async () => { } }
    );

    // Create modal via overlay entity
    const modal = overlay.createModal({
        title: 'todo.modal.create.title',
        description: '...',
        content: form,

        buttonConfirm: configurator =>
            configurator
                .withCommand(form.getSubmitCommand())
                .asCreateButton(),

        buttonCancel: true,
    });

    // Modal can be enabled/disabled
    modal.disable();
    expect(modal.state.value.isDisabled).toBe(true);
    modal.enable();
    expect(modal.state.value.isDisabled).toBe(false);

    // Closing modal
    modal.close();
});
