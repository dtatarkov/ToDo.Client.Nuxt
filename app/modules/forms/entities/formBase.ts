import VForm from "../components/VForm.vue";
import { Form, type FormConfiguration } from "@/modules/forms/entities/form";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { FormDisabledException } from "../exceptions/formDisabledException";
import type { FormElement } from './formElement';
import type { FormElementsFactory } from '../factories/formElementsFactory';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import { AsyncCommandBase } from '@/modules/shared/entities/asyncCommandBase';
import type { Func } from '@/modules/shared/types/func';

enum FormBaseState
{
  initial = 0,
  disabled = 1,
}

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends Form<TEntity>
{
  private elementsRef = shallowRef(new Array<FormElement>());
  private stateRef = shallowRef(FormBaseState.initial);
  private submitCommand = this.createSubmitCommand();
  private handleSubmit: Func<Promise<void>, [Record<keyof TEntity, any>]>;

  private get state()
  {
    return this.stateRef.value;
  }

  private set state(value)
  {
    this.stateRef.value = value;
  }

  readonly key = getUniqueId('form');

  constructor(
    private formElementsFactory: FormElementsFactory,
    configuration: FormConfiguration<TEntity>
  )
  {
    super();

    this.handleSubmit = configuration.submit;
    this.elementsRef.value = this.formElementsFactory.createElements(configuration.scheme);
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
    return this.elementsRef.value;
  }

  get isDisabled(): boolean
  {
    return this.state === FormBaseState.disabled;
  }

  override getData(): Record<keyof TEntity, any>
  {
    const data: Record<string, any> = {};

    for (const element of this.elementsRef.value)
    {
      data[element.name] = element.value;
    }

    return data as Record<keyof TEntity, any>;
  }

  override setData(data: Record<keyof TEntity, any>)
  {
    this.assertNotDisabled();

    for (const element of this.elementsRef.value)
    {
      if (element.name in data)
      {
        element.value = data[element.name];
      }
    }
  }

  override async submitAsync(): Promise<void>
  {
    await this.submitCommand.executeAsync();
  }

  override getSubmitCommand(): AsyncCommand
  {
    return this.submitCommand;
  }

  override[Symbol.dispose](): void
  {
    this.elementsRef.value.forEach(element =>
      element[Symbol.dispose]());

    this.elementsRef.value = [];
  }

  private validate(): boolean
  {
    const result = this.elements.every(element => element.validate());

    return result;
  }

  private disable(): void
  {
    this.assertNotDisabled();

    this.state = FormBaseState.disabled;
    this.elementsRef.value.forEach(element => element.disable());
  }

  private enable(): void
  {
    if (this.state !== FormBaseState.disabled)
    {
      return;
    }

    this.state = FormBaseState.initial;
    this.elementsRef.value.forEach(element => element.enable());
  }

  private assertNotDisabled(): void
  {
    if (this.isDisabled)
    {
      throw new FormDisabledException();
    }
  }

  private createSubmitCommand()
  {
    const command = new AsyncCommandBase(async () =>
    {
      this.assertNotDisabled();

      if (!this.validate())
      {
        return false;
      }

      this.disable();

      try
      {
        const data = this.getData();
        await this.handleSubmit(data);

        return true;
      }
      finally
      {
        this.enable();
      }
    });

    return command;
  }
}
