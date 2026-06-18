import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { FormElementCreateData } from '@/modules/forms/types/formElementCreateData';

export class EntityFieldHiddenScheme extends EntityFieldSchemeBase<any>
{
    override getFormElementData(): FormElementCreateData | undefined
    {
        return undefined;
    }
}