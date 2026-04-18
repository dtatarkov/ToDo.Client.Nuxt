import { FormElementType } from "../enums/formElementType";
import type { FormElementData } from "./internal/formElementData";

type ExcludeName<T> = Omit<T, 'name'>

export type FormElementCreateData =
  ExcludeName<{ type: FormElementType.inputText } & FormElementData & Partial<InputElementTextData>> |
  ExcludeName<{ type: FormElementType.inputDate } & FormElementData & Partial<InputElementDateData>> |
  ExcludeName<{ type: FormElementType.inputTime } & FormElementData & Partial<InputElementTimeData>> |
  ExcludeName<{ type: FormElementType.inputDateTime } & FormElementData & Partial<InputElementDateTimeData>> |
  ExcludeName<{ type: FormElementType.textarea } & FormElementData & Partial<InputElementTextareaData>>