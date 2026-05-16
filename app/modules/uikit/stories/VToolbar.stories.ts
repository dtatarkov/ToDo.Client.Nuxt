import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VToolbar from '../components/VToolbar.vue';
import VButtonGeneral from '../components/VButtonGeneral.vue';

type ToolbarViewmodelStoryArgs = {
    buttons: Array<{
        title: string;
    }>;
};

const meta: Meta<ToolbarViewmodelStoryArgs> = {
    title: 'UIKit/Toolbar',
    component: VToolbar,

    render: () =>
    {
        return {
            components: { VToolbar, VButtonGeneral },

            template: `<VToolbar>
                <VButtonGeneral v-for="button of buttons" :v-bind="button" />
            </VToolbar>`,
        };
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

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