import { InputDateViewmodel } from './inputDateViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDateState } from '../types/InputDateState';
import { InputViewmodelImpl } from './inputViewmodelImpl';

export class InputDateViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData, InputDateState> implements InputDateViewmodel
{
    protected getInitialState(): InputDateState
    {
        return {
            name: '',
            value: undefined
        };
    }
}
