import type { FormElementType } from "../enums/formElementType";
import type { FormElementViewmodelData } from "./formElementViewmodelData";
import type { InputTextViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputTextViewmodelData";
import type { InputViewmodelDateData } from "@/modules/uikit/types/inputViewmodels/InputViewmodelDateData";
import type { InputTimeViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputTimeViewmodelData";
import type { InputDateTimeViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputDateTimeViewmodelData";
import type { InputTextareaViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputTextareaViewmodelData";

type ExcludeName<T> = Omit<T, 'name'>;

export type FormElementViewmodelCreateData =
  ExcludeName<{ type: FormElementType.inputText; } & FormElementViewmodelData & Partial<InputTextViewmodelData>> |
  ExcludeName<{ type: FormElementType.inputDate; } & FormElementViewmodelData & Partial<InputViewmodelDateData>> |
  ExcludeName<{ type: FormElementType.inputTime; } & FormElementViewmodelData & Partial<InputTimeViewmodelData>> |
  ExcludeName<{ type: FormElementType.inputDateTime; } & FormElementViewmodelData & Partial<InputDateTimeViewmodelData>> |
  ExcludeName<{ type: FormElementType.textarea; } & FormElementViewmodelData & Partial<InputTextareaViewmodelData>>;