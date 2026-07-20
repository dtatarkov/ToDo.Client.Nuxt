import type { Color } from './color';

export interface InputElementData<V>
{
    id?: string;
    name?: string;
    value?: V;
    hasAutofocus?: boolean;
    isDisabled?: boolean;
    color?: Color;
    highlight?: boolean;
}
