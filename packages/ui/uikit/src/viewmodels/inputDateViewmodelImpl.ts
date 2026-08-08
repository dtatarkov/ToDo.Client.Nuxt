import { InputDateViewmodel } from './inputDateViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDateState } from '../types/InputDateState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';

export class InputDateViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData, InputDateState> implements InputDateViewmodel
{
    protected createScheme(): EntityScheme<InputDateState>
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.datetime().required(),
        }));
    }

    protected getInitialState(): InputStateInitial<InputDateState, Date | undefined>
    {
        return {};
    }

    protected getDefaultValue(): Date | undefined
    {
        return undefined;
    }
}
