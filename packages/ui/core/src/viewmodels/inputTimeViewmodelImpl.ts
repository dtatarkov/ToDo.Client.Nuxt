import { InputTimeViewmodel } from './inputTimeViewmodel';
import type { InputTimeData } from '../types/inputTimeData';
import type { InputTimeState } from '../types/InputTimeState';
import { InputViewmodelImpl } from './inputViewmodelImpl';

export class InputTimeViewmodelImpl extends InputViewmodelImpl<number | undefined, InputTimeData, InputTimeState> implements InputTimeViewmodel
{
    protected getInitialState(): InputTimeState
    {
        return {
            name: '',
            value: undefined
        };
    }
}
