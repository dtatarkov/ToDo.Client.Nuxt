import { FormElementViewmodelFactory } from "../interfaces/formElementViewmodelFactory";
import { FormElementBase } from "../viewmodels/formElementBase";
import type { FormElementViewmodel } from "../interfaces/formElementViewmodel";
import { FormElementType } from "../enums/formElementType";
import { dependency } from "@/modules/shared/decorators/dependency";
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import type { FormElementViewmodelCreateData } from '../types/formElementViewmodelCreateData';
import type { InputViewmodel } from '@/modules/uikit/interfaces/inputViewmodel';

@dependency(UIKitViewmodelsFactory)
export class FormElementViewmodelFactoryImpl extends FormElementViewmodelFactory
{
  constructor(
    protected uiKitElementsFactory: UIKitViewmodelsFactory,
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
        return this.uiKitElementsFactory.createInputText();
      case FormElementType.textarea:
        return this.uiKitElementsFactory.createTextarea();
      case FormElementType.inputDate:
        return this.uiKitElementsFactory.createInputDate();
      case FormElementType.inputTime:
        return this.uiKitElementsFactory.createInputTime();
      case FormElementType.inputDateTime:
        return this.uiKitElementsFactory.createInputDateTime();
    }
  }
}