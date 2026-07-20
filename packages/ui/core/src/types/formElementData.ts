import type { InputElementDateData } from './inputElementDateData';
import type { InputElementDateTimeData } from './inputElementDateTimeData';
import type { InputElementTextData } from './inputElementTextData';
import type { InputElementTextareaData } from './inputElementTextareaData';
import type { InputElementTimeData } from './inputElementTimeData';
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
    validate?: (value: V) => ValidationError | undefined;
};

export type FormElementData = FormElementGenericData<InputElementTextData, FormElementType.inputText, string> |
    FormElementGenericData<InputElementTextareaData, FormElementType.inputTextarea, string> |
    FormElementGenericData<InputElementDateData, FormElementType.inputDate, Date | undefined> |
    FormElementGenericData<InputElementTimeData, FormElementType.inputTime, number | undefined> |
    FormElementGenericData<InputElementDateTimeData, FormElementType.inputDateTime, Date | undefined>;