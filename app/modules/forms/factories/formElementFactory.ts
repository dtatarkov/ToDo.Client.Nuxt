import type { FormElementViewmodelCreateData } from '../types/formElementViewmodelCreateData';
import type { FormElement } from "../entities/formElement";

export abstract class FormElementFactory
{
  abstract createElement(name: string, data: FormElementViewmodelCreateData): FormElement;
}