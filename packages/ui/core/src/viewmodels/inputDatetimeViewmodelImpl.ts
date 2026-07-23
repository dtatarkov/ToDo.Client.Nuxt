import { InputDatetimeViewmodel } from './inputDatetimeViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDatetimeState } from '../types/InputDatetimeState';
import { InputViewmodelImpl } from './inputViewmodelImpl';

export class InputDatetimeViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData, InputDatetimeState> implements InputDatetimeViewmodel
{
    protected getInitialState(): InputDatetimeState
    {
        return {
            name: '',
            value: undefined
        };
    }
}
