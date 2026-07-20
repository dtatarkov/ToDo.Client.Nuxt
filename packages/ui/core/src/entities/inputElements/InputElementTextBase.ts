import { InputElementWithPlaceholder } from "./mixins/inputElementWithPlaceholder";
import type { InputElementText } from './inputElementText';
import { InputElementStringBase } from './inputElementStringBase';

export class InputElementTextBase extends InputElementWithPlaceholder(InputElementStringBase) implements InputElementText
{
}