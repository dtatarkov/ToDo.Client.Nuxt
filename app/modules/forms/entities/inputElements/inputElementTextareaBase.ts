import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import { InputElementStringBase } from './inputElementStringBase';
import type { InputElementTextarea } from './inputElementTextarea';
import VInputTextarea from '@/modules/uikit/components/VInputTextarea.vue';

export class InputElementTextareaBase extends InputViewmodelWithPlaceholder(InputElementStringBase) implements InputElementTextarea
{
  protected component = VInputTextarea;
}