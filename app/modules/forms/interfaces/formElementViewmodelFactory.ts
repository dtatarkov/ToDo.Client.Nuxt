import type { FormElementViewmodelCreateData } from '../types/formElementViewmodelCreateData';
import type { FormElementViewmodel } from "./formElementViewmodel";

export abstract class FormElementViewmodelFactory
{
  abstract createElement(name: string, data: FormElementViewmodelCreateData): FormElementViewmodel;
}