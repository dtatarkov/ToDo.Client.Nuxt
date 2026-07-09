import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VInputDate from '../components/VInputDate.vue';
import { inputHasAutofocusArgType, inputHighlightArgType, inputIdArgType, inputIsDisabledArgType, inputNameArgType, storybookColorSelect } from '@client/storybook';

type InputDateStoryArgs = {
    value: Date | undefined;
    id: string;
    name: string;
    hasAutofocus: boolean;
    isDisabled: boolean;
    color?: import('../types/color').Color;
    highlight?: boolean;
};

const meta: Meta<typeof VInputDate> = {
    title: 'UIKit/InputDate',
    component: VInputDate,

    render: (args) =>
    {
        return {
            components: { VInputDate },

            setup()
            {
                useStorybookServices();

                return { args };
            },

            template: `<VInputDate v-bind="args" />`,
        };
    },

    argTypes: {
        value: {
            control: 'date',
        },
        id: inputIdArgType,
        name: inputNameArgType,
        hasAutofocus: inputHasAutofocusArgType,
        isDisabled: inputIsDisabledArgType,
        color: storybookColorSelect,
        highlight: inputHighlightArgType,
    },
};

export default meta;
type Story = StoryObj<InputDateStoryArgs>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: new Date('2026-02-20'),
        id: 'input-date-3',
        name: 'inputDate',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-date-2',
        name: 'inputDate',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: new Date('2026-03-10'),
        id: 'input-date-4',
        name: 'inputDate',
        hasAutofocus: false,
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: new Date('2026-04-01'),
        id: 'input-date-5',
        name: 'inputDate',
        hasAutofocus: false,
        isDisabled: false,
        color: 'error',
        highlight: true,
    },
};