import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';

type ToolbarViewmodelStoryArgs = {
    buttons: Array<{
        title: string;
    }>;
};

const meta: Meta<ToolbarViewmodelStoryArgs> = {
    title: 'UIKit/Toolbar',

    render: (args) =>
    {
        useAppServices();

        const uikitFactory = useService(UIKitViewmodelsFactory);
        const toolbar = uikitFactory.createToolbar();

        for (const buttonData of args.buttons)
        {
            const button = uikitFactory.createButtonGeneral({
                title: buttonData.title,
            });

            toolbar.addElement(button);
        }

        return {
            setup()
            {
                return { toolbar };
            },

            template: `<component :is="toolbar.component" />`,
        };
    }
};

export default meta;
type Story = StoryObj<ToolbarViewmodelStoryArgs>;

export const Default: Story = {
    args: {
        buttons: [
            { title: 'Добавить Задание' },
            { title: 'Выбрать всё' },
            { title: 'Удалить' },
        ]
    }
};

export const SingleButton: Story = {
    args: {
        buttons: [
            { title: 'Добавить Задание' },
        ]
    }
};

export const ManyButtons: Story = {
    args: {
        buttons: [
            { title: 'Добавить' },
            { title: 'Выбрать' },
            { title: 'Сохранить' },
            { title: 'Сохранить как' },
            { title: 'Экспортировать' },
            { title: 'Удалить' },
            { title: 'Помощь' },
        ]
    }
};

export const EmptyToolbar: Story = {
    args: {
        buttons: []
    }
};