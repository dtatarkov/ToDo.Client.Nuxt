import { getUniqueId } from "@@/modules/shared/runtime/app/utils/getUniqueId";

export abstract class InputElementBase<V = any> extends InputElement<V>
{
  protected data: Record<string, any> = reactive({
    id        : undefined,
    name      : '',
    autofocus : false,
    class     : 'w-full',
    modelValue: undefined,

    'update:modelValue': (value: V) =>
    {
      this.value = value;
    }
  });

  readonly key = getUniqueId('input-element-base');

  constructor(
    protected stringsService: StringsService,
  )
  {
    super();
  }

  get id(): string
  {
    return this.data.id;
  }

  set id(value: string)
  {
    if (this.stringsService.isStringEmpty(value))
    {
      this.data.id = undefined;
    }
    else
    {
      this.data.id = value;
    }
  }

  get name(): string
  {
    return this.data.name;
  }

  set name(value: string)
  {
    this.data.name = value;
  }

  get autofocus(): boolean
  {
    return this.data.autofocus;
  }

  set autofocus(value: boolean)
  {
    this.data.autofocus = value;
  }

  get value(): V
  {
    return this.data.modelValue;
  }

  set value(value: V)
  {
    this.data.modelValue = value;
  }
}