import VForm from "../components/VForm.vue";
import { FormViewmodel } from "@/modules/forms/interfaces/formViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { FormDisabledException } from "../exceptions/formDisabledException";
import type { FormElementViewmodelCreateData } from '../types/formElementViewmodelCreateData';
import type { FormElementViewmodel } from '../interfaces/formElementViewmodel';
import type { FormElementViewmodelFactory } from '../interfaces/formElementViewmodelFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';
import { HandlerWrapper } from '@/modules/shared/entities/handlerWrapper';
import type { Action } from '@/modules/shared/types/action';

enum FormBaseState
{
  initial = 0,
  disabled = 1,
}

export class FormViewmodelBase<TEntity extends Record<string, any> = Record<string, any>> extends FormViewmodel
{
  private elementsInternal: Ref<FormElementViewmodel[]> = shallowRef([]);
  private state = FormBaseState.initial;
  private disabledStateChangeHandler = new HandlerWrapper<[boolean]>();
  private submittedHandler = new HandlerWrapper();

  readonly key = getUniqueId('form');

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

  override getData(): Record<keyof TEntity, any>
  {
    const data: Record<string, any> = {};

    for (const element of this.elementsInternal.value)
    {
      data[element.name] = element.value;
    }

    return data as Record<keyof TEntity, any>;
  }

  override setData(data: Record<keyof TEntity, any>)
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

  override setElements(elements: Partial<Record<keyof TEntity, FormElementViewmodelCreateData>>)
  {
    this.elementsInternal.value = Object.entries(elements).map(([name, createData]) =>
    {
      const element = this.formElementFactory.createElement(name, createData as FormElementViewmodelCreateData);

      return element;
    });
  }

  override async submit(): Promise<void>
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

      this.submittedHandler.handle();
    }
    finally
    {
      this.enable();
    }
  }

  override setDisabledStateChangeHandler(handler: Action<[boolean]>): void
  {
    this.disabledStateChangeHandler.setHandler(handler);
  }

  override setSubmittedHandler(handler: Action): void
  {
    this.submittedHandler.setHandler(handler);
  }

  override destroy(): void
  {
    this.submittedHandler.destroy();
    this.disabledStateChangeHandler.destroy();
  }

  private disable(): void
  {
    if (this.state === FormBaseState.disabled)
    {
      throw new FormDisabledException();
    }

    this.state = FormBaseState.disabled;
    this.elementsInternal.value.forEach(element => element.disable());
    this.disabledStateChangeHandler.handle(true);
  }

  private enable(): void
  {
    if (this.state !== FormBaseState.disabled)
    {
      return;
    }

    this.state = FormBaseState.initial;
    this.elementsInternal.value.forEach(element => element.enable());
    this.disabledStateChangeHandler.handle(false);
  }
}
