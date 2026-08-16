import type { FormElementCreateData } from '../types/formElementCreateData';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';

export abstract class FormElementViewmodelsFactory
{
    abstract createViewmodels(elementsData: Record<string, FormElementCreateData>): FormElementViewmodel[];
}
