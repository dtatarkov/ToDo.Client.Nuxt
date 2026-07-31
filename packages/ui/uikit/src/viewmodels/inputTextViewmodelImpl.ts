import { InputTextViewmodel } from './inputTextViewmodel';
import type { InputTextData } from '../types/inputTextData';
import type { InputTextState } from '../types/InputTextState';
import { InputViewmodelImpl } from './inputViewmodelImpl';

export class InputTextViewmodelImpl extends InputViewmodelImpl<string, InputTextData, InputTextState> implements InputTextViewmodel
{
    protected getInitialState(): InputTextState
    {
        return {
            name: '',
            value: ''
        };
    }
}
