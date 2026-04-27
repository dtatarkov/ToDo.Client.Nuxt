import type { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import type { VueComponentPropsScheme } from '@/modules/shared/types/vueComponentPropsScheme';
import { mergeDeep } from '@/modules/shared/utils/mergeDeep';
import type { InputViewmodelData } from '@/modules/uikit/types/inputViewmodels/inputViewmodelData';
import { InputViewmodelNuxtUIBase, type InputViewmodelNuxtUIBaseProps } from "./inputViewmodelNuxtUIBase";

export type InputViewmodelNuxtUIBaseStringProps = InputViewmodelNuxtUIBaseProps<string>;
export type InputViewmodelNuxtUIBaseStringData = InputViewmodelData<string>;

export abstract class InputViewmodelNuxtUIBaseString<
  Props extends InputViewmodelNuxtUIBaseStringProps = InputViewmodelNuxtUIBaseStringProps,
  Data extends InputViewmodelNuxtUIBaseStringData = InputViewmodelNuxtUIBaseStringData
> extends InputViewmodelNuxtUIBase<string, Props, Data>
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