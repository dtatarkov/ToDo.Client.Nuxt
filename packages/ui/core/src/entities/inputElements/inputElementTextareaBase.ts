import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import { InputElementStringBase } from './inputElementStringBase';
import type { InputElementTextarea } from './inputElementTextarea';

export class InputElementTextareaBase extends InputViewmodelWithPlaceholder(InputElementStringBase) implements InputElementTextarea
{
}