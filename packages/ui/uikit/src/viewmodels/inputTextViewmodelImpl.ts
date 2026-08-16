import type { InputTextData } from '../types/inputTextData';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import { messageKeyValues } from '@client/infrastructure-messages';
import { InputType } from '../enums/inputType';
import type { InputTextViewmodel } from './inputTextViewmodel';

export class InputTextViewmodelImpl extends InputViewmodelImpl<string, InputTextData> implements InputTextViewmodel
{
    protected createScheme()
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.string().withDefault(''),
            placeholderKey: scheme.enum(messageKeyValues),
        }));
    }

    protected getInitialData(): InputTextData
    {
        return {};
    }

    protected getDefaultValue(): string
    {
        return '';
    }

    protected getType(): InputType
    {
        return InputType.inputText;
    }
}
