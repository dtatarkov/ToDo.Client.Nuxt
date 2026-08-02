import { InputTextViewmodel } from './inputTextViewmodel';
import type { InputTextData } from '../types/inputTextData';
import type { InputTextState } from '../types/InputTextState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';

export class InputTextViewmodelImpl extends InputViewmodelImpl<string, InputTextData, InputTextState> implements InputTextViewmodel
{
    protected getInitialState(): InputStateInitial<InputTextState, string>
    {
        return {
            type: InputType.inputText,
        };
    }

    protected getDefaultValue(): string
    {
        return '';
    }
}
