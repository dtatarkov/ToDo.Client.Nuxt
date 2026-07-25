import type { FormElementData } from '@client/ui-forms';

export type FormProps<K extends string> = {
    elements: Record<K, FormElementData>;
    isDisabled?: boolean;
};