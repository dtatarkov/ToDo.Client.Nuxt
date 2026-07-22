import type { FormElement } from "../entities/formElement";
import type { FormElementData } from '../types/formElementData';

export abstract class FormElementsFactory
{
    abstract createElements(elementsData: Record<string, FormElementData>): FormElement[];
}