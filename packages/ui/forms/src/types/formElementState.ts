import type { InputType, InputTextState, InputTextareaState, InputDateState, InputTimeState, InputDatetimeState, InputHiddenState, InputState } from '@client/ui-uikit';
import type { FormElementDataBase } from './formElementData';

export type FormElementStateVariant<TType extends InputType, TState extends InputState> =
    FormElementDataBase & TState & { inputType: TType; };

export type FormElementState =
    | FormElementStateVariant<InputType.inputText, InputTextState>
    | FormElementStateVariant<InputType.inputTextarea, InputTextareaState>
    | FormElementStateVariant<InputType.inputDate, InputDateState>
    | FormElementStateVariant<InputType.inputTime, InputTimeState>
    | FormElementStateVariant<InputType.inputDateTime, InputDatetimeState>
    | FormElementStateVariant<InputType.inputHidden, InputHiddenState>;
