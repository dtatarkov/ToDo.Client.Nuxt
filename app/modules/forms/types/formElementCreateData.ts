import type { FormElementType } from "../enums/formElementType";
import type { FormElementData } from "./formElementData";
import type { InputTextareaData } from '@/modules/uikit/types/inputTextareaData';
import type { InputDateData } from '@/modules/uikit/types/inputDateData';
import type { InputDateTimeData } from '@/modules/uikit/types/inputDateTimeData';
import type { InputTextData } from '@/modules/uikit/types/inputTextData';
import type { InputTimeData } from '@/modules/uikit/types/inputTimeData';

type ExcludeName<T> = Omit<T, 'name'>;

export type FormElementCreateData =
  ExcludeName<{ type: FormElementType.inputText; } & FormElementData & Partial<InputTextData>> |
  ExcludeName<{ type: FormElementType.inputDate; } & FormElementData & Partial<InputDateData>> |
  ExcludeName<{ type: FormElementType.inputTime; } & FormElementData & Partial<InputTimeData>> |
  ExcludeName<{ type: FormElementType.inputDateTime; } & FormElementData & Partial<InputDateTimeData>> |
  ExcludeName<{ type: FormElementType.textarea; } & FormElementData & Partial<InputTextareaData>>;