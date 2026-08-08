import { InputTextareaViewmodel } from './inputTextareaViewmodel';
import type { InputTextareaData } from '../types/inputTextareaData';
import type { InputTextareaState } from '../types/InputTextareaState';
import type { InputStateInitial } from '../types/InputState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { messageKeyValues } from '@client/infrastructure-messages';

export class InputTextareaViewmodelImpl extends InputViewmodelImpl<string, InputTextareaData, InputTextareaState> implements InputTextareaViewmodel
{
    protected createScheme(): EntityScheme<InputTextareaState>
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.string().required(),
            placeholderKey: scheme.enum(messageKeyValues),
        }));
    }

    protected getInitialState(): InputStateInitial<InputTextareaState, string>
    {
        return {};
    }

    protected getDefaultValue(): string
    {
        return '';
    }
}
