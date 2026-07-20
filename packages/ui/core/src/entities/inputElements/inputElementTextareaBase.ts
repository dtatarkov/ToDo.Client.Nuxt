import { InputElementWithPlaceholder as InputElementWithPlaceholder } from "./mixins/inputElementWithPlaceholder";
import { InputElementStringBase } from './inputElementStringBase';
import type { InputElementTextarea } from './inputElementTextarea';

export class InputElementTextareaBase extends InputElementWithPlaceholder(InputElementStringBase) implements InputElementTextarea
{
}