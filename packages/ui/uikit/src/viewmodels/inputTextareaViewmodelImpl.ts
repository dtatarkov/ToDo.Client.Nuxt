import type { InputTextareaData } from '../types/inputTextareaData';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { messageKeyValues } from '@client/infrastructure-messages';
import { InputType } from '../enums/inputType';
import type { InputTextareaViewmodel } from './inputTextareaViewmodel';

export class InputTextareaViewmodelImpl extends InputViewmodelImpl<string, InputTextareaData> implements InputTextareaViewmodel
{
    protected createScheme()
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.string().withDefault(''),
            placeholderKey: scheme.enum(messageKeyValues),
        }));
    }

    protected getDefaultValue(): string
    {
        return '';
    }

    protected getType(): InputType
    {
        return InputType.inputTextarea;
    }
}