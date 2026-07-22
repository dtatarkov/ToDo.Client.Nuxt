import { InputTextareaViewmodel, type InputTextareaViewmodelState } from './inputTextareaViewmodel';
import type { InputElementTextareaData } from '../types/inputElementTextareaData';
import { InputBaseViewmodelImpl } from './inputBaseViewmodelImpl';

export class InputTextareaViewmodelImpl extends InputBaseViewmodelImpl<string, InputElementTextareaData, InputTextareaViewmodelState> implements InputTextareaViewmodel
{
    protected getInitialState(): InputTextareaViewmodelState
    {
        return {
            name: '',
            value: ''
        };
    }
}
