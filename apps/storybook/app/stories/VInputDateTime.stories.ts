import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { VInputDateTime } from '@client/ui-vue';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputHighlightArgType } from '../argTypes/inputHighlightArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { storybookColorSelect } from '../argTypes/storybookColorSelect';


const meta: Meta<typeof VInputDateTime> = {
    title: 'UIKit/InputDateTime',
    component: VInputDateTime,

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
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: new Date('2026-06-15T09:45:00'),
        id: 'input-datetime-3',
        name: 'inputDateTime',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-datetime-2',
        name: 'inputDateTime',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: new Date('2026-07-20T18:20:00'),
        id: 'input-datetime-4',
        name: 'inputDateTime',
        hasAutofocus: false,
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: new Date('2026-05-01T12:00:00'),
        id: 'input-datetime-5',
        name: 'inputDateTime',
        hasAutofocus: false,
        isDisabled: false,
        color: 'error',
        highlight: true,
    },
};