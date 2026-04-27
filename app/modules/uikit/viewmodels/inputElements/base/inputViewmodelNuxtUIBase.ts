import { LazyEntityBase } from '@/modules/shared/entities/lazyEntityBase';
import type { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import type { DataAdapterFieldsScheme } from '@/modules/shared/types/dataAdapterFieldsScheme';
import type { VueComponentPropsScheme } from '@/modules/shared/types/vueComponentPropsScheme';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { InputViewmodelData } from '@/modules/uikit/types/inputViewmodels/inputViewmodelData';
import { InputViewmodel } from "../../../interfaces/inputViewmodel";

export type InputViewmodelNuxtUIBaseProps<V> = {
  id: string | undefined;
  name: string | undefined;
  autofocus: boolean;
  class: string;
  modelValue: V;
  disabled: boolean;
};

export abstract class InputViewmodelNuxtUIBase<
  V,
  Props extends InputViewmodelNuxtUIBaseProps<any>,
  Data extends InputViewmodelData<V>
> extends InputViewmodel<V>
{
  private readonly _propsLazy: LazyEntityBase<Props>;
  private readonly _dataLazy: LazyEntityBase<Data>;

  readonly key = getUniqueId('input-element-base');

  constructor(
    protected stringsService: StringsService,
    protected vueComponentPropsFactory: VueComponentPropsFactory,
    protected dataAdapterFactory: DataAdapterFactory,
  )
  {
    super();

    this._propsLazy = new LazyEntityBase(() =>
      this.vueComponentPropsFactory.create(this.getPropsScheme()));

    this._dataLazy = new LazyEntityBase(() =>
      this.dataAdapterFactory.create(this.props, this.getDataScheme()));
  }

  protected get props(): Props
  {
    return this._propsLazy.value;
  }

  protected get data(): Data
  {
    return this._dataLazy.value;
  }

  get id(): string | undefined
  {
    return this.data.id;
  }

  set id(value: string | undefined)
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

  get name(): string | undefined
  {
    return this.data.name;
  }

  set name(value: string | undefined)
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
    return this.data.value;
  }

  set value(value: V)
  {
    this.data.value = value;
  }

  override disable(): void
  {
    this.props.disabled = true;
  }

  override enable(): void
  {
    this.props.disabled = false;
  }

  protected getPropsScheme(): VueComponentPropsScheme<Props>
  {
    const scheme = {
      id: { value: <string | undefined>undefined },
      name: { value: <string | undefined>undefined },
      autofocus: { value: false },
      class: { value: 'w-full' },
      modelValue: { withEmit: true },
      disabled: { value: false },
    } as VueComponentPropsScheme<Props>;

    return scheme;
  }

  protected getDataScheme(): DataAdapterFieldsScheme<Data, Props>
  {
    const scheme = {
      id: {},
      name: {},
      autofocus: {},
      value: { from: 'modelValue' },
    } as DataAdapterFieldsScheme<Data, Props>;

    return scheme;
  }
}