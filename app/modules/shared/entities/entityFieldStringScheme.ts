import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { z } from 'zod';
import type { EntityFieldStringData } from '../types/entityFieldStringData';

export class EntityFieldStringScheme extends EntityFieldSchemeBase<string>
{
    readonly label?: string;
    readonly placeholder?: string;
    readonly isLong: boolean;

    constructor(zod4Scheme: z.ZodType<string>, data: EntityFieldStringData)
    {
        super(zod4Scheme);
        this.label = data.label;
        this.placeholder = data.placeholder;
        this.isLong = data.isLong ?? false;
    }
}