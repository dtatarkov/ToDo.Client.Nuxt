import { InputTimeViewmodel, type InputTimeViewmodelState } from './inputTimeViewmodel';
import type { InputElementTimeData } from '../types/inputElementTimeData';
import { InputBaseViewmodelImpl } from './inputBaseViewmodelImpl';

export class InputTimeViewmodelImpl extends InputBaseViewmodelImpl<number | undefined, InputElementTimeData, InputTimeViewmodelState> implements InputTimeViewmodel
{
    protected getInitialState(): InputTimeViewmodelState
    {
        return {
            name: '',
            value: undefined
        };
    }
}
