import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import type { FormElementCreateData } from "../types/formElementCreateData";
import { FormElementBase } from "../entities/formElementBase";
import type { FormElement } from "../interfaces/internal/formElement";
import { FormElementType } from "../enums/formElementType";

export class FormElementFactoryImpl extends FormElementFactory
{
  constructor(
    protected uiKitElementsFactory: UIKitElementsFactory,
  )
  {
    super();
  }

  createElement(name: string, data: FormElementCreateData): FormElement
  {
    const inputElement = this.createInputElement(data.type);
    const formElement = new FormElementBase(inputElement);

    formElement.setData({ ...data, name });

    return formElement;
  }

  private createInputElement(type: FormElementType): InputElement
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