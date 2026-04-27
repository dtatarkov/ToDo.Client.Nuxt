import VFormField from "../components/VFormField.vue";
import { FormFieldViewmodel } from "../interfaces/formFieldViewmodel";
import { Viewmodel } from "@/modules/uikit/interfaces/viewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";

export class FormFieldBase extends FormFieldViewmodel
{
  private _data = reactive({
    label: '',
    name: '',
  });

  private _children = {
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
    return this._data.label;
  }

  set label(value: string)
  {
    this._data.label = value;
  }

  get name(): string
  {
    return this._data.name;
  }

  set name(value: string)
  {
    this._data.name = value;
  }

  get content()
  {
    return this._children.content;
  }

  set content(value)
  {
    this._children.content = value;
  }
}