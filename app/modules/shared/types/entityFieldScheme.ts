import type { EntityFieldType } from '../enums/entityFieldType';


export type EntityFieldScheme = EntityStringFieldScheme | EntityDateTimeFieldScheme | EntityHiddenFieldScheme;

export type EntityStringFieldScheme = {
    type: EntityFieldType.string;
    label?: string;
    placeholder?: string;
    isLong?: boolean;
};

export type EntityDateTimeFieldScheme = {
    type: EntityFieldType.datetime;
    label?: string;
};

export type EntityHiddenFieldScheme = {
    type: EntityFieldType.hidden;
};
