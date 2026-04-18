import { FormElementFactory } from "../interfaces/formElementFactory";
import type { FormElementCreateData } from "../types/formElementCreateData";
import { FormElementBase } from "../entities/formElementBase";
import type { FormElement } from "../interfaces/formElement";
import { FormElementType } from "../enums/formElementType";
import type { DatesService } from "@shared/interfaces/datesService";
import type { StringsService } from "@shared/interfaces/stringsService";
import type { TimeMapper } from "@shared/interfaces/timeMapper";
import type { ZonedDateTimeMapper } from "@shared/interfaces/zonedDateTimeMapper";
import type { InputElement } from "@uikit/interfaces/inputElement";
import { InputElementText } from "@uikit/entities/inputElements/inputElementText";
import { InputElementDate } from "@uikit/entities/inputElements/inputElementDate";
import { InputElementDateTime } from "@uikit/entities/inputElements/inputElementDateTime";
import { InputElementTextArea } from "@uikit/entities/inputElements/inputElementTextarea";
import { InputElementTime } from "@uikit/entities/inputElements/inputElementTime";
import { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';

export class FormElementFactoryImpl implements FormElementFactory
{
  constructor(
    private datesService: DatesService,
    private stringsService: StringsService,
    private zonedDateTimeMapper: ZonedDateTimeMapper,
    private timeMapper: TimeMapper,
    protected vueComponentPropsFactory: VueComponentPropsFactory,
    protected dataAdapterFactory: DataAdapterFactory,
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
        return new InputElementText(this.stringsService, this.vueComponentPropsFactory, this.dataAdapterFactory);
      case FormElementType.textarea:
        return new InputElementTextArea(this.stringsService, this.vueComponentPropsFactory, this.dataAdapterFactory);
      case FormElementType.inputDate:
        return new InputElementDate(this.zonedDateTimeMapper, this.stringsService, this.vueComponentPropsFactory, this.dataAdapterFactory);
      case FormElementType.inputTime:
        return new InputElementTime(this.timeMapper, this.stringsService, this.vueComponentPropsFactory, this.dataAdapterFactory);
      case FormElementType.inputDateTime:
        return new InputElementDateTime(this.datesService, this.stringsService, this.zonedDateTimeMapper, this.timeMapper, this.vueComponentPropsFactory, this.dataAdapterFactory);
    }
  }
}