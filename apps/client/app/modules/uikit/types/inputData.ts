
import type { Color } from '@client/ui-core';

export type InputData<V = unknown> = {
    id?: string;
    name?: string;
    hasAutofocus?: boolean;
    isDisabled?: boolean;
    value?: V;
    color?: Color;
    highlight?: boolean;
};
