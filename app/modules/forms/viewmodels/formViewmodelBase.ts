import VForm from "../components/VForm.vue";
import { FormViewmodel } from "@/modules/forms/interfaces/formViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { EventBusBase } from "@/modules/shared/entities/eventBusBase";
import { FormDisabledException } from "../exceptions/formDisabledException";
import type { FormElementViewmodelCreateData } from '../types/formElementViewmodelCreateData';
import type { FormElementViewmodel } from '../interfaces/formElementViewmodel';
import type { FormElementViewmodelFactory } from '../interfaces/formElementViewmodelFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';

enum FormBaseState
{
  initial = 0,
  disabled = 1,
}

export class FormViewmodelBase<TEntity extends Record<string, any> = Record<string, any>> extends FormViewmodel
{
  private elementsInternal: Ref<FormElementViewmodel[]> = shallowRef([]);
  private state = FormBaseState.initial;

  readonly key = getUniqueId('form');
  readonly onDisabledStateChange = new EventBusBase<boolean>();
  readonly onSubmitted = new EventBusBase();

  readonly component = {
    setup: () =>
    {
      return () => h(VForm, { form: this });
    }
  };

  constructor(
    private formElementFactory: FormElementViewmodelFactory,
    private formSubmitHandler: FormSubmitHandler,
  )
  {
    super();
  }

  get elements(): FormElementViewmodel[]
  {
    return this.elementsInternal.value;
  }

  get isDisabled(): boolean
  {
    return this.state === FormBaseState.disabled;
  }

  getData(): Record<keyof TEntity, any>
  {
    const data: Record<string, any> = {};

    for (const element of this.elementsInternal.value)
    {
      data[element.name] = element.value;
    }

    return data as Record<keyof TEntity, any>;
  }

  setData(data: Record<keyof TEntity, any>)
  {
    if (this.state === FormBaseState.disabled)
    {
      throw new FormDisabledException();
    }

    for (const element of this.elementsInternal.value)
    {
      if (element.name in data)
      {
        element.value = data[element.name];
      }
    }
  }

  setElements(elements: Partial<Record<keyof TEntity, FormElementViewmodelCreateData>>)
  {
    this.elementsInternal.value = Object.entries(elements).map(([name, createData]) =>
    {
      const element = this.formElementFactory.createElement(name, createData as FormElementViewmodelCreateData);

      return element;
    });
  }

  async submit(): Promise<void>
  {
    if (this.state === FormBaseState.disabled)
    {
      throw new FormDisabledException();
    }

    this.disable();

    try
    {
      const data = this.getData();
      await this.formSubmitHandler.submit(data);

      this.onSubmitted.emit();
    }
    finally
    {
      this.enable();
    }
  }

  private disable(): void
  {
    if (this.state === FormBaseState.disabled)
    {
      throw new FormDisabledException();
    }

    this.state = FormBaseState.disabled;
    this.elementsInternal.value.forEach(element => element.disable());
    this.onDisabledStateChange.emit(true);
  }

  private enable(): void
  {
    if (this.state !== FormBaseState.disabled)
    {
      return;
    }

    this.state = FormBaseState.initial;
    this.elementsInternal.value.forEach(element => element.enable());
    this.onDisabledStateChange.emit(false);
  }
}
