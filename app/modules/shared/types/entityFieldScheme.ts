import type { EntityFieldTag } from '../enums/entityFieldTag';
import type { EntityFieldType } from '../enums/entityFieldType';


export type EntityFieldScheme = {
    type: EntityFieldType;
    label?: string;
    placeholder?: string;
    tags?: EntityFieldTag[];
};
