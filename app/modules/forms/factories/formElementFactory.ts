import type { FormElementCreateData } from '../types/formElementCreateData';
import type { FormElement } from "../entities/formElement";

export abstract class FormElementFactory
{
  abstract createElement(name: string, data: FormElementCreateData): FormElement;
}