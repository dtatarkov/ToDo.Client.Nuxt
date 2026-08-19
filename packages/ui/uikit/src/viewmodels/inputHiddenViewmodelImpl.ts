import type { InputHiddenData } from '../types/inputHiddenData';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { InputType } from '../enums/inputType';
import type { InputHiddenViewmodel } from './inputHiddenViewmodel';

export class InputHiddenViewmodelImpl extends InputViewmodelImpl<any, InputHiddenData> implements InputHiddenViewmodel
{
    protected createScheme()
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.any(),
        }));
    }

    protected getInitialData(): InputHiddenData
    {
        return {};
    }

    protected getDefaultValue(): any
    {
        return undefined;
    }

    protected getType(): InputType
    {
        return InputType.inputHidden;
    }
}
