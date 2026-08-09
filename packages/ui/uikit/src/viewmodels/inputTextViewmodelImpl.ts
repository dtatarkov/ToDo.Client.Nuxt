import { InputTextViewmodel } from './inputTextViewmodel';
import type { InputTextData } from '../types/inputTextData';
import type { InputTextState } from '../types/InputTextState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { messageKeyValues } from '@client/infrastructure-messages';

export class InputTextViewmodelImpl extends InputViewmodelImpl<string, InputTextData, InputTextState> implements InputTextViewmodel
{
    protected createScheme(): EntityScheme<InputTextData, InputTextState>
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
}
