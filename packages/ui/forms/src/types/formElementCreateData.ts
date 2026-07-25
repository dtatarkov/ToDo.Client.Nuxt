import type { InputTextData, InputTextareaData, InputDateData, InputTimeData, InputDateTimeData } from '@client/ui-core';
import type { FormElementType } from '../enums/formElementType';
import type { FormElementGenericCreateData } from './formElementGenericCreateData';

export type FormElementCreateData =
    | FormElementGenericCreateData<InputTextData, FormElementType.inputText, string>
    | FormElementGenericCreateData<InputTextareaData, FormElementType.inputTextarea, string>
    | FormElementGenericCreateData<InputDateData, FormElementType.inputDate, Date | undefined>
    | FormElementGenericCreateData<InputTimeData, FormElementType.inputTime, number | undefined>
    | FormElementGenericCreateData<InputDateTimeData, FormElementType.inputDateTime, Date | undefined>;