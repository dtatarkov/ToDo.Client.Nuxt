import type { InputDateData } from './inputDateData';
import type { InputDateTimeData } from './inputDateTimeData';
import type { InputTextData } from './inputTextData';
import type { InputTextareaData } from './inputTextareaData';
import type { InputTimeData } from './inputTimeData';
import type { FormElementType } from '../enums/formElementType';
import type { ValidationError } from '@client/shared';
import type { MessageKey } from '@client/infrastructure-messages';

export type FormElementGenericData<
    TInputElementData,
    TType extends FormElementType,
    V
> = Partial<Omit<TInputElementData, 'name'>> & {
    type: TType;
    labelKey?: MessageKey;
    errorKey?: MessageKey;
    validate?: (value: V) => ValidationError | undefined;
};

export type FormElementData = FormElementGenericData<InputTextData, FormElementType.inputText, string> |
    FormElementGenericData<InputTextareaData, FormElementType.inputTextarea, string> |
    FormElementGenericData<InputDateData, FormElementType.inputDate, Date | undefined> |
    FormElementGenericData<InputTimeData, FormElementType.inputTime, number | undefined> |
    FormElementGenericData<InputDateTimeData, FormElementType.inputDateTime, Date | undefined>;