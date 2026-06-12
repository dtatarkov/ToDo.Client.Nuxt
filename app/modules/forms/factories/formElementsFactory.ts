import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { FormElement } from "../entities/formElement";

export abstract class FormElementsFactory
{
    abstract createElements<TEntity extends Record<string, any>>(
        scheme: EntityScheme<TEntity>
    ): FormElement[];
}