import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { useService } from '@/modules/shared/composables/useService';
import { FormElementType } from '../enums/formElementType';
import { action } from 'storybook/actions';
import type { FormElementCreateData } from '../types/formElementCreateData';
import { FormFactory } from '../factories/formFactory';

type FormViewmodelStoryArgs = {
    elements?: Record<string, FormElementCreateData>;
};

const meta: Meta<FormViewmodelStoryArgs> = {
    title: 'Forms/Form',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const formFactory = useService(FormFactory);

                const form = formFactory.create({
                    submit: async (formData) =>
                    {
                        action('submit')(formData);
                    }
                });

                watchEffect(() =>
                {
                    if (args.elements)
                    {
                        form.setElements(args.elements);
                    }
                });

                return { form };
            },

            template: `<component :is="form.component" />`,
        };
    },

    argTypes: {
        elements: {
            control: 'object',
        },
    },
};

export default meta;
type Story = StoryObj<FormViewmodelStoryArgs>;

export const Default: Story = {};

export const ToDoEditForm: Story = {
    args: {
        elements: {
            title: {
                type: FormElementType.inputText,
                label: 'Название задачи',
                placeholder: 'Введите название задачи',
            },
            description: {
                type: FormElementType.textarea,
                label: 'Описание задачи',
                placeholder: 'Введите описание задачи'
            },
            completionDatePlanned: {
                type: FormElementType.inputDateTime,
                label: 'Плановая дата выполнения',
            }
        },
    },
};