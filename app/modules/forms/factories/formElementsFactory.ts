import type { EntityScheme } from '@/modules/entitySchemes/entities/entityScheme';
import type { FormElement } from "../entities/formElement";

export abstract class FormElementsFactory
{
    abstract createElements<TEntity extends Record<string, any>>(
        scheme: EntityScheme<TEntity>
    ): FormElement[];
}