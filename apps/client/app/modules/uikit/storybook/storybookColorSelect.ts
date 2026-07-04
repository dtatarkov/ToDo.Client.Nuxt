import type { InputType } from 'storybook/internal/csf';
import type { Color } from '../types/color';

export const storybookColorSelect: InputType = {
    control: 'select',
    options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as Color[],
};