import { InputTimeViewmodel } from './inputTimeViewmodel';
import type { InputTimeData } from '../types/inputTimeData';
import type { InputTimeState } from '../types/InputTimeState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';

export class InputTimeViewmodelImpl extends InputViewmodelImpl<number | undefined, InputTimeData, InputTimeState> implements InputTimeViewmodel
{
    protected getInitialState(): InputStateInitial<InputTimeState, number | undefined>
    {
        return {
            type: InputType.inputTime,
        };
    }

    protected getDefaultValue(): number | undefined
    {
        return undefined;
    }
}
