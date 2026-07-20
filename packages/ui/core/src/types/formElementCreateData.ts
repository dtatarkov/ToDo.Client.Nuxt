import type { FormElementType } from '../enums/formElementType';
import type { FormElementGenericCreateData } from './formElementGenericCreateData';
import type { InputElementTextData } from './inputElementTextData';
import type { InputElementTextareaData } from './inputElementTextareaData';
import type { InputElementDateData } from './inputElementDateData';
import type { InputElementTimeData } from './inputElementTimeData';
import type { InputElementDateTimeData } from './inputElementDateTimeData';

export type FormElementCreateData =
    | FormElementGenericCreateData<InputElementTextData, FormElementType.inputText, string>
    | FormElementGenericCreateData<InputElementTextareaData, FormElementType.inputTextarea, string>
    | FormElementGenericCreateData<InputElementDateData, FormElementType.inputDate, Date | undefined>
    | FormElementGenericCreateData<InputElementTimeData, FormElementType.inputTime, number | undefined>
    | FormElementGenericCreateData<InputElementDateTimeData, FormElementType.inputDateTime, Date | undefined>;