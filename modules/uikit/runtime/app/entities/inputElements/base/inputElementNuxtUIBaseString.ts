import { InputElementNuxtUIBase, type InputElementNuxtUIBaseProps } from "./inputElementNuxtUIBase";

export type InputElementNuxtUIBaseStringProps = InputElementNuxtUIBaseProps<string>;
export type InputElementNuxtUIBaseStringData = InputElementData<string>;

export abstract class InputElementNuxtUIBaseString<
  Props extends InputElementNuxtUIBaseStringProps = InputElementNuxtUIBaseStringProps,
  Data extends InputElementNuxtUIBaseStringData = InputElementNuxtUIBaseStringData
> extends InputElementNuxtUIBase<string, Props, Data>
{
  constructor(
    stringsService: StringsService,
    vueComponentPropsFactory: VueComponentPropsFactory,
    dataAdapterFactory: DataAdapterFactory,
  )
  {
    super(stringsService, vueComponentPropsFactory, dataAdapterFactory);
  }

  protected override getPropsScheme(): VueComponentPropsScheme<Props>
  {
    return mergeDeep(super.getPropsScheme(), <Partial<VueComponentPropsScheme<Props>>>{
      modelValue: {
        value: ''
      }
    });
  }
}