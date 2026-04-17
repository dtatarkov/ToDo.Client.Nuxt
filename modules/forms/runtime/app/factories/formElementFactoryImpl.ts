import { FormElementFactory } from "../interfaces/formElementFactory";
import type { FormElementCreateData } from "../types/formElementCreateData";
import { FormElementBase } from "../entities/formElementBase";
import type { FormElement } from "../interfaces/formElement";
import { FormElementType } from "../enums/formElementType";

export class FormElementFactoryImpl implements FormElementFactory
{
  constructor(
    private datesService: DatesService,
    private stringsService: StringsService,
    private zonedDateTimeMapper: ZonedDateTimeMapper,
    private timeMapper: TimeMapper,
  )
  {
  }

  createElement(name: string, data: FormElementCreateData): FormElement
  {
    const inputElement = this.createInputElement(data.type);
    const formElement  = new FormElementBase(inputElement);

    formElement.setData({ ...data, name });

    return formElement;
  }

  private createInputElement(type: FormElementType): InputElement
  {
    switch (type)
    {
      case FormElementType.inputText:
        return new InputElementText(this.stringsService);
      case FormElementType.textarea:
        return new InputElementTextArea(this.stringsService);
      case FormElementType.inputDate:
        return new InputElementDate(this.zonedDateTimeMapper, this.stringsService);
      case FormElementType.inputTime:
        return new InputElementTime(this.timeMapper, this.stringsService);
      case FormElementType.inputDateTime:
        return new InputElementDateTime(this.datesService, this.stringsService, this.zonedDateTimeMapper, this.timeMapper);
    }
  }
}