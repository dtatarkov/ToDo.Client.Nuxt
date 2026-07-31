import type { MessageKey } from '@client/infrastructure-messages';
import { InputElement } from './inputElement';
import type { InputTextareaData } from '../../types/inputTextareaData';

export abstract class InputElementTextarea extends InputElement<string> implements InputTextareaData
{
    abstract placeholderKey: MessageKey | undefined;
}