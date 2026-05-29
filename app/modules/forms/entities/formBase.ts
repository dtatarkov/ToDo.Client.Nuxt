import VForm from "../components/VForm.vue";
import { Form } from "@/modules/forms/entities/form.js";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { FormDisabledException } from "../exceptions/formDisabledException";
import type { FormElementCreateData } from '../types/formElementCreateData.js';
import type { FormElement } from './formElement.js';
import type { FormElementFactory } from '../factories/formElementFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';
import { UIElementActionBase } from '@/modules/uikit/entities/uiElementActionBase';

enum FormBaseState
{
  initial = 0,
  disabled = 1,
}

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends Form
{
  private elementsInternal: Ref<FormElement[]> = shallowRef([]);
  private state = FormBaseState.initial;


  readonly key = getUniqueId('form');
  readonly action = new UIElementActionBase(() => this.submitAsyncInternal());

  constructor(
    private formElementFactory: FormElementFactory,
    private formSubmitHandler: FormSubmitHandler,
  )
  {
    super();
  }

  get vnode()
  {
    const props = {
      isDisabled: this.isDisabled
    };

    const children = {
      default: () => this.elements.map(element => element.vnode)
    };

    return h(VForm, props, children);
  }

  get elements(): FormElement[]
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
    this.assertNotDisabled();

    for (const element of this.elementsInternal.value)
    {
      if (element.name in data)
      {
        element.value = data[element.name];
      }
    }
  }

  override setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>)
  {
    this.assertNotDisabled();

    this.elementsInternal.value = Object.entries(elements).map(([name, createData]) =>
    {
      const element = this.formElementFactory.createElement(name, createData as FormElementCreateData);

      return element;
    });
  }

  override async submitAsync(): Promise<void>
  {
    this.action.executeAsync();
  }

  override destroy(): void
  {
    this.action.destroy();
  }

  private async submitAsyncInternal(): Promise<void>
  {
    this.assertNotDisabled();
    this.disable();

    try
    {
      const data = this.getData();
      await this.formSubmitHandler.submit(data);
    }
    finally
    {
      this.enable();
    }
  }

  private disable(): void
  {
    this.assertNotDisabled();

    this.state = FormBaseState.disabled;
    this.elementsInternal.value.forEach(element => element.disable());
  }

  private enable(): void
  {
    if (this.state !== FormBaseState.disabled)
    {
      return;
    }

    this.state = FormBaseState.initial;
    this.elementsInternal.value.forEach(element => element.enable());
  }

  private assertNotDisabled(): void
  {
    if (this.isDisabled)
    {
      throw new FormDisabledException();
    }
  }
}
