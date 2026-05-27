import type { FormElement } from "../entities/formElement";
import { FormElementType } from "../enums/formElementType";
import { dependency } from "@/modules/shared/decorators/dependency";
import type { FormElementViewmodelCreateData } from '../types/formElementViewmodelCreateData';
import type { InputViewmodel } from '@/modules/forms/entities/inputElements/inputViewmodel';
import { InputElementsFactory } from './inputElementsFactory';
import { FormElementBase } from '../entities/formElementBase';
import type { FormElementFactory } from './formElementFactory';

@dependency(InputElementsFactory)
export class FormElementFactoryImpl implements FormElementFactory
{
  constructor(
    protected inputElementsFactory: InputElementsFactory,
  )
  {
  }

  createElement(name: string, data: FormElementViewmodelCreateData): FormElement
  {
    const inputElement = this.createInputElement(data.type);
    const formElement = new FormElementBase(inputElement);

    formElement.setData({ ...data, name });

    return formElement;
  }

  private createInputElement(type: FormElementType): InputViewmodel
  {
    switch (type)
    {
      case FormElementType.inputText:
        return this.inputElementsFactory.createInputText();
      case FormElementType.textarea:
        return this.inputElementsFactory.createTextarea();
      case FormElementType.inputDate:
        return this.inputElementsFactory.createInputDate();
      case FormElementType.inputTime:
        return this.inputElementsFactory.createInputTime();
      case FormElementType.inputDateTime:
        return this.inputElementsFactory.createInputDateTime();
    }
  }
}