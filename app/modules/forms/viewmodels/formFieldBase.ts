import VFormField from "../components/VFormField.vue";
import { FormFieldViewmodel } from "../interfaces/formFieldViewmodel";
import { Viewmodel } from "@/modules/uikit/interfaces/viewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";

export class FormFieldBase extends FormFieldViewmodel
{
  private data = reactive({
    label: '',
    name: '',
  });

  private children = {
    content: <Viewmodel | undefined>undefined
  };

  readonly key = getUniqueId('form-field');

  readonly component = {
    setup: () =>
    {
      return () => h(VFormField, { field: this });
    }
  };

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