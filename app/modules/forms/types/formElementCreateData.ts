import { FormElementType } from "../enums/formElementType";
import type { FormElementData } from "./internal/formElementData";
import type { InputElementTextData } from "@/modules/uikit/types/inputElements/inputElementTextData";
import type { InputElementDateData } from "@/modules/uikit/types/inputElements/InputElementDateData";
import type { InputElementTimeData } from "@/modules/uikit/types/inputElements/inputElementTimeData";
import type { InputElementDateTimeData } from "@/modules/uikit/types/inputElements/InputElementDateTimeData";
import type { InputElementTextareaData } from "@/modules/uikit/types/inputElements/inputElementTextareaData";

type ExcludeName<T> = Omit<T, 'name'>;

export type FormElementCreateData =
  ExcludeName<{ type: FormElementType.inputText; } & FormElementData & Partial<InputElementTextData>> |
  ExcludeName<{ type: FormElementType.inputDate; } & FormElementData & Partial<InputElementDateData>> |
  ExcludeName<{ type: FormElementType.inputTime; } & FormElementData & Partial<InputElementTimeData>> |
  ExcludeName<{ type: FormElementType.inputDateTime; } & FormElementData & Partial<InputElementDateTimeData>> |
  ExcludeName<{ type: FormElementType.textarea; } & FormElementData & Partial<InputElementTextareaData>>;