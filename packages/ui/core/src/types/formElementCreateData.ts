import type { FormElementType } from '../enums/formElementType';
import type { FormElementGenericCreateData } from './formElementGenericCreateData';
import type { InputTextData } from './inputTextData';
import type { InputTextareaData } from './inputTextareaData';
import type { InputDateData } from './inputDateData';
import type { InputTimeData } from './inputTimeData';
import type { InputDateTimeData } from './inputDateTimeData';

export type FormElementCreateData =
    | FormElementGenericCreateData<InputTextData, FormElementType.inputText, string>
    | FormElementGenericCreateData<InputTextareaData, FormElementType.inputTextarea, string>
    | FormElementGenericCreateData<InputDateData, FormElementType.inputDate, Date | undefined>
    | FormElementGenericCreateData<InputTimeData, FormElementType.inputTime, number | undefined>
    | FormElementGenericCreateData<InputDateTimeData, FormElementType.inputDateTime, Date | undefined>;