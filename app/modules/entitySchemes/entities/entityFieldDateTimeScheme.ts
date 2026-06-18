import type { z } from 'zod';
import type { EntityFieldDateTimeData } from '../types/entityFieldDateTimeData';
import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { FormElementCreateData } from '@/modules/forms/types/formElementCreateData';
import { FormElementType } from '@/modules/forms/enums/formElementType';

export class EntityFieldDateTimeScheme extends EntityFieldSchemeBase<Date | undefined>
{
    private label: string;

    constructor(zod4Scheme: z.ZodType<Date | undefined>, data: EntityFieldDateTimeData)
    {
        super(zod4Scheme);

        this.label = data.label;
    }

    override getFormElementData(): FormElementCreateData
    {
        return {
            type: FormElementType.inputDateTime,
            label: this.label,
            validate: value => this.validate(value)
        };
    }
}