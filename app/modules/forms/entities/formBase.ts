import VForm from "../components/VForm.vue";
import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import type { FormElement } from "../interfaces/internal/formElement";
import { Form } from "@forms/interfaces/form";
import { getUniqueId } from "@shared/utils/getUniqueId";
import { EventBusBase } from "@shared/entities/eventBusBase";
import type { Func } from "@shared/types/func";
import { FormDisabledException } from "../exceptions/formDisabledException";
import type { FormElementCreateData } from '../types/formElementCreateData';

enum FormBaseState
{
  initial = 0,
  disabled = 1,
}

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends Form
{
  #elements: Ref<FormElement[]> = shallowRef([]);
  #state = FormBaseState.initial;

  readonly key = getUniqueId('form');
  readonly onSubmit = new EventBusBase<Record<keyof TEntity, any>>();
  readonly onDisabledStateChange = new EventBusBase<boolean>();

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

  get isDisabled(): boolean
  {
    return this.#state === FormBaseState.disabled;
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
    if (this.#state === FormBaseState.disabled)
    {
      throw new FormDisabledException();
    }

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
    if (this.#state === FormBaseState.disabled)
    {
      throw new FormDisabledException();
    }

    this.onSubmit.emit(this.getData());
  }

  disable(): void
  {
    if (this.#state === FormBaseState.disabled)
    {
      throw new FormDisabledException();
    }

    this.#state = FormBaseState.disabled;
    this.#elements.value.forEach(element => element.disable());
    this.onDisabledStateChange.emit(true);
  }

  enable(): void
  {
    if (this.#state !== FormBaseState.disabled)
    {
      return;
    }

    this.#state = FormBaseState.initial;
    this.#elements.value.forEach(element => element.enable());
    this.onDisabledStateChange.emit(false);
  }

  async use(func: Func<Promise<void>>): Promise<void>
  {
    this.disable();

    try
    {
      await func();
    }
    finally
    {
      this.enable();
    }
  }
}
