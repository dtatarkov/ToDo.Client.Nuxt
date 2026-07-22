import { InputDateViewmodel, type InputDateViewmodelState } from './inputDateViewmodel';
import type { InputElementDateData } from '../types/inputElementDateData';
import { InputBaseViewmodelImpl } from './inputBaseViewmodelImpl';

export class InputDateViewmodelImpl extends InputBaseViewmodelImpl<Date | undefined, InputElementDateData, InputDateViewmodelState> implements InputDateViewmodel
{
    protected getInitialState(): InputDateViewmodelState
    {
        return {
            name: '',
            value: undefined
        };
    }
}
