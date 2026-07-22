import { InputTextViewmodel, type InputTextViewmodelState } from './inputTextViewmodel';
import type { InputElementTextData } from '../types/inputElementTextData';
import { InputBaseViewmodelImpl } from './inputBaseViewmodelImpl';

export class InputTextViewmodelImpl extends InputBaseViewmodelImpl<string, InputElementTextData, InputTextViewmodelState> implements InputTextViewmodel
{
    protected getInitialState(): InputTextViewmodelState
    {
        return {
            name: '',
            value: ''
        };
    }
}
