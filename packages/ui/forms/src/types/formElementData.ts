import type { FormElementType } from '../enums/formElementType';
import type { ValidationError } from '@client/shared';
import type { MessageKey } from '@client/infrastructure-messages';
import type { InputDateData, InputDateTimeData, InputTextareaData, InputTextData, InputTimeData } from '@client/ui-uikit';

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