import { FormElementViewmodelFactory } from "../interfaces/formElementViewmodelFactory";
import { FormElementBase } from "../viewmodels/formElementBase";
import type { FormElementViewmodel } from "../interfaces/formElementViewmodel";
import { FormElementType } from "../enums/formElementType";
import { dependency } from "@/modules/shared/decorators/dependency";
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import type { FormElementViewmodelCreateData } from '../types/formElementViewmodelCreateData';
import type { InputViewmodel } from '@/modules/uikit/interfaces/inputViewmodel';
import type { InputElementsFactory } from './inputElementsFactory';

@dependency(UIKitViewmodelsFactory)
export class FormElementViewmodelFactoryImpl extends FormElementViewmodelFactory
{
  constructor(
    protected inputElementsFactory: InputElementsFactory,
  )
  {
    super();
  }

  createElement(name: string, data: FormElementViewmodelCreateData): FormElementViewmodel
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