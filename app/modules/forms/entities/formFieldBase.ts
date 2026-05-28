import VFormField from "../components/VFormField.vue";
import { FormField } from "./formField.js";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { UIElement } from '@/modules/uikit/interfaces/uiElement.js';

export class FormFieldBase extends FormField
{
  private data = reactive({
    label: '',
    name: '',
  });

  private children = {
    content: <UIElement | undefined>undefined
  };

  readonly key = getUniqueId('form-field');

  get vnode()
  {
    return h(VFormField, this.data, {
      default: () => this.content?.vnode
    });
  }

  get label(): string
  {
    return this.data.label;
  }

  set label(value: string)
  {
    this.data.label = value;
  }

  get name(): string
  {
    return this.data.name;
  }

  set name(value: string)
  {
    this.data.name = value;
  }

  get content()
  {
    return this.children.content;
  }

  set content(value)
  {
    this.children.content = value;
  }
}