import { VForm } from "#components";
import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import type { FormElement } from "../interfaces/internal/formElement";

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends Form
{
  #elements: Ref<FormElement[]> = shallowRef([]);

  readonly key = getUniqueId('form');
  readonly onSubmit = new EventBusBase<Record<keyof TEntity, any>>();

  readonly component = {
    setup: () =>
    {
      return () => h(VForm, { form: this });
    }
  };

  constructor(
    protected formElementFactory: FormElementFactory
  )
  {
    super();
  }

  get elements(): FormElement[]
  {
    return this.#elements.value;
  }

  getData(): Record<keyof TEntity, any>
  {
    const data: Record<string, any> = {};

    for (const element of this.#elements.value)
    {
      data[element.name] = element.value;
    }

    return data as Record<keyof TEntity, any>;
  }

  setData(data: Record<keyof TEntity, any>)
  {
    for (const element of this.#elements.value)
    {
      if (element.name in data)
      {
        element.value = data[element.name];
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

  submit(): void
  {
    this.onSubmit.emit(this.getData());
  }
}
