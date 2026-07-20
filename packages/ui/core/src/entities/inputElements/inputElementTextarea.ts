import type { MessageKey } from '@client/infrastructure-messages';
import { InputElement } from './inputElement';
import type { InputElementTextareaData } from '../../types/inputElementTextareaData';

export abstract class InputElementTextarea extends InputElement<string> implements InputElementTextareaData
{
    abstract placeholderKey: MessageKey | undefined;
}