import type { MessageKey } from '@client/infrastructure-messages';
import { InputElement } from './inputElement';
import type { InputTextData } from '../../types/inputTextData';

export abstract class InputElementText extends InputElement<string> implements InputTextData
{
    abstract placeholderKey: MessageKey | undefined;
}