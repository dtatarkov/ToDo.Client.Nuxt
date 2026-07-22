import { InputDatetimeViewmodel, type InputDatetimeViewmodelState } from './inputDatetimeViewmodel';
import type { InputElementDateData } from '../types/inputElementDateData';
import { InputBaseViewmodelImpl } from './inputBaseViewmodelImpl';

export class InputDatetimeViewmodelImpl extends InputBaseViewmodelImpl<Date | undefined, InputElementDateData, InputDatetimeViewmodelState> implements InputDatetimeViewmodel
{
    protected getInitialState(): InputDatetimeViewmodelState
    {
        return {
            name: '',
            value: undefined
        };
    }
}
