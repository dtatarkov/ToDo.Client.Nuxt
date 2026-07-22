import type { MessageKey } from '@client/infrastructure-messages';
import type { FormElementData } from '@client/ui-core';

export type FormProps<K extends string> = {
    elementsData: Record<K, FormElementData>;
    data?: Record<K, any>;
    errors?: Partial<Record<K, MessageKey>>;
    isDisabled?: boolean;
};