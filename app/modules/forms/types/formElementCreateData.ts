import type { InputElementDateData } from '../entities/inputElements/InputElementDate';
import type { InputElementDateTimeData } from '../entities/inputElements/inputElementDateTime';
import type { InputElementTextData } from '../entities/inputElements/inputElementText';
import type { InputElementTextareaData } from '../entities/inputElements/inputElementTextarea';
import type { InputElementTimeData } from '../entities/inputElements/inputElementTime';
import type { FormElementType } from "../enums/formElementType";
import type { FormElementData } from "./formElementData";

type ExcludeName<T> = Omit<T, 'name'>;

export type FormElementCreateData =
  ExcludeName<{ type: FormElementType.inputText; } & FormElementData & Partial<InputElementTextData>> |
  ExcludeName<{ type: FormElementType.inputDate; } & FormElementData & Partial<InputElementDateData>> |
  ExcludeName<{ type: FormElementType.inputTime; } & FormElementData & Partial<InputElementTimeData>> |
  ExcludeName<{ type: FormElementType.inputDateTime; } & FormElementData & Partial<InputElementDateTimeData>> |
  ExcludeName<{ type: FormElementType.textarea; } & FormElementData & Partial<InputElementTextareaData>>;