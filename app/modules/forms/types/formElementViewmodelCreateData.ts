import { FormElementType } from "../enums/formElementType";
import type { FormElementViewmodelData } from "./formElementViewmodelData";
import type { InputViewmodelTextData } from "@/modules/uikit/types/inputViewmodels/inputViewmodelTextData";
import type { InputViewmodelDateData } from "@/modules/uikit/types/inputViewmodels/InputViewmodelDateData";
import type { InputViewmodelTimeData } from "@/modules/uikit/types/inputViewmodels/inputViewmodelTimeData";
import type { InputDateTimeViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputDateTimeViewmodelData";
import type { InputTextareaViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputTextareaViewmodelData";

type ExcludeName<T> = Omit<T, 'name'>;

export type FormElementViewmodelCreateData =
  ExcludeName<{ type: FormElementType.inputText; } & FormElementViewmodelData & Partial<InputViewmodelTextData>> |
  ExcludeName<{ type: FormElementType.inputDate; } & FormElementViewmodelData & Partial<InputViewmodelDateData>> |
  ExcludeName<{ type: FormElementType.inputTime; } & FormElementViewmodelData & Partial<InputViewmodelTimeData>> |
  ExcludeName<{ type: FormElementType.inputDateTime; } & FormElementViewmodelData & Partial<InputDateTimeViewmodelData>> |
  ExcludeName<{ type: FormElementType.textarea; } & FormElementViewmodelData & Partial<InputTextareaViewmodelData>>;