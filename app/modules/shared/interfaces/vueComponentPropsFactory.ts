import type { VueComponentPropsScheme } from "../types/vueComponentPropsScheme";

export abstract class VueComponentPropsFactory
{
  abstract create<Props extends Record<string, any>>(propsScheme: VueComponentPropsScheme<Props>): Props;
}