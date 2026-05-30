import type { EntityFieldType } from '../enums/entityFieldType';


export type EntityFieldScheme = {
    type: EntityFieldType.string;
    label?: string;
    placeholder?: string;
    isLong?: boolean;
} | {
    type: EntityFieldType.datetime;
    label?: string;
} | {
    type: EntityFieldType.identity | EntityFieldType.hidden;
};
