import type { VueComponentPropsScheme } from "../types/vueComponentPropsScheme";
import type { VueComponentPropScheme } from "../types/vueComponentPropScheme";
import type { Ref } from "vue";

export type VueComponentPropsFactoryResult<S extends VueComponentPropsScheme> = {
  [K in keyof S]: S[K] extends VueComponentPropScheme<infer V> ? Ref<V> : never;
} & {
  [K in keyof S as S[K] extends { withEmit: true } ? `update:${string & K}` : never]:
    S[K] extends VueComponentPropScheme<infer V> ? (value: V) => void : never;
};

export abstract class VueComponentPropsFactory
{
  abstract create<S extends VueComponentPropsScheme>(propsScheme: S): VueComponentPropsFactoryResult<S>;
}