import type { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';
import type { StringsService } from '@shared/interfaces/stringsService';
import type { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import type { VueComponentPropsScheme } from '@shared/types/vueComponentPropsScheme';
import { mergeDeep } from '@shared/utils/mergeDeep';
import type { InputElementData } from '~/modules/uikit/types/inputElements/inputElementData';
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