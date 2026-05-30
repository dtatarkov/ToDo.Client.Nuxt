import type { EntityFieldType } from '../enums/entityFieldType';


export type EntityFieldScheme = {
    type: EntityFieldType;
    label?: string;
    placeholder?: string;
    isLong?: boolean;
};
