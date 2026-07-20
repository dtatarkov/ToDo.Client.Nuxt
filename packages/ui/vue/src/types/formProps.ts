import type { FormElementData } from '@client/ui-core';

export type FormProps<K extends string> = {
    elements: Record<K, FormElementData>;
    data?: Record<K, any>;
    isDisabled?: boolean;
};