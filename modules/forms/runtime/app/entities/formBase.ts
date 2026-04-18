import { VForm } from "#components";
import type { FormElementCreateData } from "../types/formElementCreateData";
import { Form } from "../interfaces/form";
import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import type { FormElement } from "../interfaces/internal/formElement";

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends Form
{
  #elements: Ref<FormElement[]> = shallowRef([]);

  readonly key = getUniqueId('form');

  readonly component = {
    setup: () =>
    {
      return () => h(VForm, { form: this });
    }
  }

  constructor(
    protected formElementFactory: FormElementFactory
  )
  {
    super();
  }

  get elements()
  {
    return this.#elements.value
  }

  setData(data: Record<string, any>)
  {
    for (const element of this.#elements.value)
    {
      if (element.name in data)
      {
        element.setValue(data[element.name]);
      }
    }
  }

  setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>)
  {
    this.#elements.value = Object.entries(elements).map(([name, createData]) =>
    {
      const element = this.formElementFactory.createElement(name, createData as FormElementCreateData);

      return element;
    });
  }
}
