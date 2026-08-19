import type { InputTimeData } from '../types/inputTimeData';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';
import type { InputTimeViewmodel } from './inputTimeViewmodel';

export class InputTimeViewmodelImpl extends InputViewmodelImpl<number | undefined, InputTimeData> implements InputTimeViewmodel
{
    protected createScheme()
    {
        return this.withBaseScheme((scheme) => ({
            value: scheme.number(),
            id: scheme.string(),
        }));
    }

    protected getDefaultValue(): number | undefined
    {
        return undefined;
    }

    protected getType(): InputType
    {
        return InputType.inputTime;
    }
}