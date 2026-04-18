import { InputElement } from "../../interfaces/inputElement";
import type { StringsService } from "@shared/interfaces/stringsService";
import { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import type { DataAdapterFactory } from "@shared/interfaces/dataAdapterFactory";

export type InputElementNuxtUIBaseProps<V> = {
  id: string | undefined;
  name: string | undefined;
  autofocus: boolean;
  class: string;
  modelValue: V;
};

export abstract class InputElementNuxtUIBase<
  V,
  Props extends InputElementNuxtUIBaseProps<any>,
  Data extends InputElementData<V>
> extends InputElement<V> {
  protected props: Props
  protected data: Data

  readonly key = getUniqueId('input-element-base');

  constructor(
    protected stringsService: StringsService,
    protected vueComponentPropsFactory: VueComponentPropsFactory,
    protected dataAdapterFactory: DataAdapterFactory,
  ) {
    super();

    this.props = this.vueComponentPropsFactory.create(this.getPropsScheme());
    this.data = this.dataAdapterFactory.create(this.props, this.getDataScheme());
  }

  get id(): string | undefined {
    return this.data.id;
  }

  set id(value: string | undefined) {
    if (this.stringsService.isStringEmpty(value)) {
      this.data.id = undefined;
    }
    else {
      this.data.id = value;
    }
  }

  get name(): string | undefined {
    return this.data.name;
  }

  set name(value: string | undefined) {
    this.data.name = value;
  }

  get autofocus(): boolean {
    return this.data.autofocus;
  }

  set autofocus(value: boolean) {
    this.data.autofocus = value;
  }

  get value(): V {
    return this.data.value;
  }

  set value(value: V) {
    this.data.value = value;
  }

  protected getPropsScheme(): VueComponentPropsScheme<Props> {
    const scheme = {
      id: { value: <string | undefined>undefined },
      name: { value: <string | undefined>undefined },
      autofocus: { value: false },
      class: { value: 'w-full' },
      modelValue: { withEmit: true },
    } as VueComponentPropsScheme<Props>;

    return scheme;
  }

  protected getDataScheme(): DataAdapterFieldsScheme<Data, Props> {
    const scheme = {
      id: { },
      name: { },
      autofocus: { },
      value: { from: 'modelValue' },
    } as DataAdapterFieldsScheme<Data, Props>;

    return scheme;
  }
}