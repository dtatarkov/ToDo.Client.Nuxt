import { InputViewmodelWithPlaceholder } from "./mixins/inputViewmodelWithPlaceholder";
import type { InputElementText } from './inputElementText';
import { InputElementStringBase } from './inputElementStringBase';
import VInputText from '@/modules/uikit/components/VInputText.vue';

export class InputElementTextBase extends InputViewmodelWithPlaceholder(InputElementStringBase) implements InputElementText
{
  get vnode()
  {
    return h(VInputText, this.data);
  };
}