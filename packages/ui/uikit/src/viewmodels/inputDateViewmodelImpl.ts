import type { InputDateData } from '../types/inputDateData';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';
import type { InputDateViewmodel } from './inputDateViewmodel';

export class InputDateViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData> implements InputDateViewmodel
{
    protected createScheme()
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

    protected getType(): InputType
    {
        return InputType.inputDate;
    }
}
