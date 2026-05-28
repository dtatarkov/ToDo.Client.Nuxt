import VForm from "../components/VForm.vue";
import { Form } from "@/modules/forms/entities/form.js";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { FormDisabledException } from "../exceptions/formDisabledException";
import type { FormElementCreateData } from '../types/formElementCreateData.js';
import type { FormElement } from './formElement.js';
import type { FormElementFactory } from '../factories/formElementFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';
import { HandlerWrapper } from '@/modules/shared/entities/handlerWrapper';
import type { Action } from '@/modules/shared/types/action';

enum FormBaseState
{
  initial = 0,
  disabled = 1,
}

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends Form
{
  private elementsInternal: Ref<FormElement[]> = shallowRef([]);
  private state = FormBaseState.initial;
  private disabledStateChangeHandler = new HandlerWrapper<[boolean]>();
  private submittingStateChangeHandler = new HandlerWrapper<[boolean]>();
  private submittedHandler = new HandlerWrapper();

  readonly key = getUniqueId('form');

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

  override setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>)
  {
    this.elementsInternal.value = Object.entries(elements).map(([name, createData]) =>
    {
      const element = this.formElementFactory.createElement(name, createData as FormElementCreateData);

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
    this.submittingStateChangeHandler.handle(true);

    try
    {
      const data = this.getData();
      await this.formSubmitHandler.submit(data);

      this.submittedHandler.handle();
    }
    finally
    {
      this.enable();
      this.submittingStateChangeHandler.handle(false);
    }
  }

  override setDisabledStateChangeHandler(handler: Action<[boolean]>): void
  {
    this.disabledStateChangeHandler.setHandler(handler);
  }

  override setSubmittingStateChangeHandler(handler: Action<[boolean]>): void
  {
    this.submittingStateChangeHandler.setHandler(handler);
  }

  override setSubmittedHandler(handler: Action): void
  {
    this.submittedHandler.setHandler(handler);
  }

  override destroy(): void
  {
    this.submittedHandler.destroy();
    this.submittingStateChangeHandler.destroy();
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
