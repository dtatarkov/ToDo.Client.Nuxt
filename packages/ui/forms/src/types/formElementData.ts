import type { InputData, InputDateData, InputDateTimeData, InputTextareaData, InputTextData, InputTimeData, InputType } from '@client/ui-uikit';
import type { MessageKey } from '@client/infrastructure-messages';

export type FormElementDataBase = {

    labelKey?: MessageKey;
    errorKey?: MessageKey;
};

export type FormElementDataVariant<TType extends InputType, TData extends InputData> =
    FormElementDataBase & TData & { inputType: TType; };

export type FormElementData =
    | FormElementDataVariant<InputType.inputText, InputTextData>
    | FormElementDataVariant<InputType.inputTextarea, InputTextareaData>
    | FormElementDataVariant<InputType.inputDate, InputDateData>
    | FormElementDataVariant<InputType.inputTime, InputTimeData>
    | FormElementDataVariant<InputType.inputDateTime, InputDateTimeData>;