import { InputTextViewmodel } from './inputTextViewmodel';
import type { InputTextData } from '../types/inputTextData';
import type { InputTextState } from '../types/InputTextState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { messageKeyValues } from '@client/infrastructure-messages';

export class InputTextViewmodelImpl extends InputViewmodelImpl<string, InputTextData, InputTextState> implements InputTextViewmodel
{
    protected createScheme(): EntityScheme<InputTextState>
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.string().required(),
            placeholderKey: scheme.enum(messageKeyValues),
        }));
    }

    protected getInitialState(): InputStateInitial<InputTextState, string>
    {
        return {};
    }

    protected getDefaultValue(): string
    {
        return '';
    }
}
