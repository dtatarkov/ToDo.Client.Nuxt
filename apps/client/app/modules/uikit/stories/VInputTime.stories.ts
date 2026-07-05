import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VInputTime from '../components/VInputTime.vue';
import { useStorybookSharedServices } from '@/modules/shared/composables/useStorybookSharedServices.js';
import { inputIdArgType, inputNameArgType, inputHasAutofocusArgType, inputIsDisabledArgType, storybookColorSelect, inputHighlightArgType } from '@packages/storybook';

const meta: Meta<typeof VInputTime> = {
    title: 'UIKit/InputTime',
    component: VInputTime,

    argTypes: {
        value: {
            control: 'number',
        },
        id: inputIdArgType,
        name: inputNameArgType,
        hasAutofocus: inputHasAutofocusArgType,
        isDisabled: inputIsDisabledArgType,
        color: storybookColorSelect,
        highlight: inputHighlightArgType,
    },

    render: (args) =>
    {
        return {
            components: { VInputTime },

            setup()
            {
                useStorybookSharedServices();

                return { args };
            },

            template: `<VInputTime v-bind="args" />`,
        };
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: 61200000, // 17:00
        id: 'input-time-3',
        name: 'inputTime',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-time-2',
        name: 'inputTime',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: 46800000, // 13:00
        id: 'input-time-4',
        name: 'inputTime',
        hasAutofocus: false,
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: 0,
        id: 'input-time-5',
        name: 'inputTime',
        hasAutofocus: false,
        isDisabled: false,
        color: 'error',
        highlight: true,
    },
};