import { InputDateViewmodel } from './inputDateViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDateState } from '../types/InputDateState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';

export class InputDateViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData, InputDateState> implements InputDateViewmodel
{
    protected createScheme(): EntityScheme<InputDateData, InputDateState>
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.datetime(),
        }));
    }

    protected getInitialData(): InputDateData
    {
        return {};
    }

    protected getDefaultValue(): Date | undefined
    {
        return undefined;
    }
}
