export type VueComponentPropsScheme<Props extends Record<string, any>> = {
    [K in keyof Props]: VueComponentPropScheme<Props[K]>;
}