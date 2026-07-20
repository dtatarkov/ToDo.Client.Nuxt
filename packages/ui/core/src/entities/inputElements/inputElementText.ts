import type { MessageKey } from '@client/infrastructure-messages';
import { InputElement } from './inputElement';
import type { InputElementTextData } from '../../types/inputElementTextData';

export abstract class InputElementText extends InputElement<string> implements InputElementTextData
{
    abstract placeholderKey: MessageKey | undefined;
}