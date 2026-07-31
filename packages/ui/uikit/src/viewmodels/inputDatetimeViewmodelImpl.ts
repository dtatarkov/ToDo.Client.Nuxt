import { InputDatetimeViewmodel } from './inputDatetimeViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDatetimeState } from '../types/InputDatetimeState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';

export class InputDatetimeViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData, InputDatetimeState> implements InputDatetimeViewmodel
{
    protected getInitialState(): InputStateInitial<InputDatetimeState, Date | undefined>
    {
        return {};
    }

    protected getDefaultValue(): Date | undefined
    {
        return undefined;
    }
}
