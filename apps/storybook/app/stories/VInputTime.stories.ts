import { VInputTime } from '@client/ui-vue';
import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputHighlightArgType } from '../argTypes/inputHighlightArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { storybookColorSelect } from '../argTypes/storybookColorSelect';


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
        shouldHighlight: inputHighlightArgType,
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
        shouldHighlight: true,
    },
};