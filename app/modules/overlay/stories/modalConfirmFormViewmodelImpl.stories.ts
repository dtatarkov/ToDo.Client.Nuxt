import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import { useService } from '@/modules/shared/composables/useService';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import { action } from 'storybook/actions';
import { watchEffect } from 'vue';
import { ModalFactory } from '../interfaces/internal/modalFactory';

type ModalConfirmFormViewmodelStoryArgs = {
    title: string;
    description: string;
};

const meta: Meta<ModalConfirmFormViewmodelStoryArgs> = {
    title: 'Overlay/ModalConfirmForm',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const modalFactory = useService(ModalFactory);
                const formFactory = useService(FormViewmodelFactory);

                const form = formFactory.create({
                    submit: async (formData) =>
                    {
                        action('submit')(formData);
                    }
                });

                form.setElements({
                    name: {
                        type: FormElementType.inputText,
                        label: 'Имя',
                        placeholder: 'Введите ваше имя',
                    }
                });

                const modal = modalFactory.createModalEditForm(form);

                watchEffect(() =>
                {
                    modal.title = args.title;
                    modal.description = args.description;
                });

                return { modal };
            },

            template: `<component :is="modal.component" />`,
        };
    },

    argTypes: {
        title: {
            control: 'text',
        },
        description: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<ModalConfirmFormViewmodelStoryArgs>;

export const Default: Story = {
    args: {
        title: 'Редактирование',
        description: 'Пожалуйста, введите ваше имя',
    },
};