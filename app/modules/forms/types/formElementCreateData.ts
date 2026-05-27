import type { FormElementType } from "../enums/formElementType";
import type { FormElementData } from "./formElementData";
import type { InputTextViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputTextViewmodelData";
import type { InputViewmodelDateData } from "@/modules/uikit/types/inputViewmodels/InputViewmodelDateData";
import type { InputTimeViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputTimeViewmodelData";
import type { InputDateTimeViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputDateTimeViewmodelData";
import type { InputTextareaViewmodelData } from "@/modules/uikit/types/inputViewmodels/inputTextareaViewmodelData";

type ExcludeName<T> = Omit<T, 'name'>;

export type FormElementCreateData =
  ExcludeName<{ type: FormElementType.inputText; } & FormElementData & Partial<InputTextViewmodelData>> |
  ExcludeName<{ type: FormElementType.inputDate; } & FormElementData & Partial<InputViewmodelDateData>> |
  ExcludeName<{ type: FormElementType.inputTime; } & FormElementData & Partial<InputTimeViewmodelData>> |
  ExcludeName<{ type: FormElementType.inputDateTime; } & FormElementData & Partial<InputDateTimeViewmodelData>> |
  ExcludeName<{ type: FormElementType.textarea; } & FormElementData & Partial<InputTextareaViewmodelData>>;