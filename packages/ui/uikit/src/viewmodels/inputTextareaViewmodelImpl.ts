import { InputTextareaViewmodel } from './inputTextareaViewmodel';
import type { InputTextareaData } from '../types/inputTextareaData';
import type { InputTextareaState } from '../types/InputTextareaState';
import { InputViewmodelImpl } from './inputViewmodelImpl';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { messageKeyValues } from '@client/infrastructure-messages';

export class InputTextareaViewmodelImpl extends InputViewmodelImpl<string, InputTextareaData, InputTextareaState> implements InputTextareaViewmodel
{
    protected createScheme(): EntityScheme<InputTextareaData, InputTextareaState>
    {
        return this.withBaseScheme(scheme => ({
            value: scheme.string().withDefault(''),
            placeholderKey: scheme.enum(messageKeyValues),
        }));
    }

    protected getInitialData(): InputTextareaData
    {
        return {};
    }

    protected getDefaultValue(): string
    {
        return '';
    }
}
