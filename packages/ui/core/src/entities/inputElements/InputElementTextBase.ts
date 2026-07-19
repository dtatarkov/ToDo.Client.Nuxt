import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputElementText } from './inputElementText';
import { InputElementStringBase } from './inputElementStringBase';

export class InputElementTextBase extends InputViewmodelWithPlaceholder(InputElementStringBase) implements InputElementText
{
}