import type { FormElementType } from '../enums/formElementType';
import type { FormElementGenericCreateData } from './formElementGenericCreateData';
import type { InputElementTextData } from '../entities/inputElements/inputElementText';
import type { InputElementTextareaData } from '../entities/inputElements/inputElementTextarea';
import type { InputElementDateData } from '../entities/inputElements/InputElementDate';
import type { InputElementTimeData } from '../entities/inputElements/inputElementTime';
import type { InputElementDateTimeData } from '../entities/inputElements/inputElementDateTime';

export type FormElementCreateData =
    | FormElementGenericCreateData<InputElementTextData, FormElementType.inputText, string>
    | FormElementGenericCreateData<InputElementTextareaData, FormElementType.textarea, string>
    | FormElementGenericCreateData<InputElementDateData, FormElementType.inputDate, Date | undefined>
    | FormElementGenericCreateData<InputElementTimeData, FormElementType.inputTime, number | undefined>
    | FormElementGenericCreateData<InputElementDateTimeData, FormElementType.inputDateTime, Date | undefined>;