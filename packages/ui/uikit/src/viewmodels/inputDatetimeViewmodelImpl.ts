import { InputDatetimeViewmodel } from './inputDatetimeViewmodel';
import type { InputDateData } from '../types/inputDateData';
import type { InputDatetimeState } from '../types/InputDatetimeState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';

export class InputDatetimeViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData, InputDatetimeState> implements InputDatetimeViewmodel
{
    protected createScheme(): EntityScheme<InputDateData, InputDatetimeState>
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
