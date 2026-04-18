import { InputElementNuxtUIBase, type InputElementNuxtUIBaseProps } from "./inputElementNuxtUIBase";
import { StringsService } from '@shared/interfaces/stringsService';
import { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';

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