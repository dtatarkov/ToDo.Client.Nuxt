import { InputTextareaViewmodel } from './inputTextareaViewmodel';
import type { InputTextareaData } from '../types/inputTextareaData';
import type { InputTextareaState } from '../types/InputTextareaState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';

export class InputTextareaViewmodelImpl extends InputViewmodelImpl<string, InputTextareaData, InputTextareaState> implements InputTextareaViewmodel
{
    protected getInitialState(): InputStateInitial<InputTextareaState, string>
    {
        return {
            type: InputType.inputTextarea,
        };
    }

    protected getDefaultValue(): string
    {
        return '';
    }
}
