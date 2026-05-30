
import type { Color } from '@/modules/uikit/types/color';

export type InputData<V = unknown> = {
    id?: string;
    name?: string;
    hasAutofocus?: boolean;
    isDisabled?: boolean;
    value?: V;
    color?: Color;
};
