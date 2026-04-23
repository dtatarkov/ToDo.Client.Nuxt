import type { FormElement } from "./formElement";
import type { FormElementCreateData } from "../../types/formElementCreateData";

export abstract class FormElementFactory
{
  abstract createElement(name: string, data: FormElementCreateData): FormElement
}