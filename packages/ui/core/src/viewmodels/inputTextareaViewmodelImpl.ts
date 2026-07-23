import { InputTextareaViewmodel } from './inputTextareaViewmodel';
import type { InputTextareaData } from '../types/inputTextareaData';
import type { InputTextareaState } from '../types/InputTextareaState';
import { InputViewmodelImpl } from './inputViewmodelImpl';

export class InputTextareaViewmodelImpl extends InputViewmodelImpl<string, InputTextareaData, InputTextareaState> implements InputTextareaViewmodel
{
    protected getInitialState(): InputTextareaState
    {
        return {
            name: '',
            value: ''
        };
    }
}
