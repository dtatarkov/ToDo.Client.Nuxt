import { InputDateViewmodel } from './inputDateViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDateState } from '../types/InputDateState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';

export class InputDateViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData, InputDateState> implements InputDateViewmodel
{
    protected getInitialState(): InputStateInitial<InputDateState, Date | undefined>
    {
        return {
            type: InputType.inputDate,
        };
    }

    protected getDefaultValue(): Date | undefined
    {
        return undefined;
    }
}
