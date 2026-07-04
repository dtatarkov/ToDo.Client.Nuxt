import type { FormElementsCreateData } from '../types/formElementsCreateData';
import type { FormElement } from "../entities/formElement";

export abstract class FormElementsFactory
{
    abstract createElements(elementsData: FormElementsCreateData): FormElement[];
}