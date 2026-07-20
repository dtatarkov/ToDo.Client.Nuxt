import type { MessageKey } from '@client/infrastructure-messages';

export type FormFieldProps = {
    name?: string;
    labelKey?: MessageKey;
    help?: string;
};