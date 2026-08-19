import { InputDatetimeViewmodel } from './inputDatetimeViewmodel';
import type { InputDateData } from '../types/inputDateData';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';

export class InputDatetimeViewmodelImpl extends InputViewmodelImpl<Date | undefined, InputDateData> implements InputDatetimeViewmodel
{
    protected createScheme()
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.datetime(),
        }));
    }

    protected getDefaultValue(): Date | undefined
    {
        return undefined;
    }

    protected getType(): InputType
    {
        return InputType.inputDateTime;
    }
}
