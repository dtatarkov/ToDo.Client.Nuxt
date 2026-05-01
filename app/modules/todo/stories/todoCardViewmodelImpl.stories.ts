import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import type { ToDoData } from '../interfaces/todo';
import { ToDoCardViewmodelImpl } from '../viewmodels/todoCardViewmodelImpl';
import type { ToDoCardViewmodelData } from '../interfaces/todoCardViewmodel';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { useServicesContainer } from '@/modules/shared/composables/useServicesContainer';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';
import { useUIKitServices } from '@/modules/uikit/composables/useUIKitServices';
import { useFormsServices } from '@/modules/forms/composables/useFormsServices';
import { useOverlayServices } from '@/modules/overlay/composables/useOverlayServices';
import { useTodoServices } from '../composables/useTodoServices';

const meta: Meta<ToDoCardViewmodelData> = {
    title: 'ToDo/ToDoCard',

    render: (args) =>
    {
        useServicesContainer(true);
        useSharedServices();
        useUIKitServices();
        useFormsServices();
        useOverlayServices();
        useTodoServices();

        const card = new ToDoCardViewmodelImpl();
        updatePropertiesWithData(card, args);

        return {
            setup()
            {
                return { card };
            },

            template: `<component :is="card.component" />`,
        };
    }
};

export default meta;
type Story = StoryObj<Partial<ToDoData>>;

export const Default: Story = {
    args: {
        title: 'Title',
        description: 'Description',
    }
};
