import type { VueComponentPropScheme } from "../types/vueComponentPropScheme";
import type { VueComponentPropsScheme } from "../types/vueComponentPropsScheme";
import { VueComponentPropsFactory } from "../interfaces/vueComponentPropsFactory";
import type { VueComponentPropsFactoryResult } from "../interfaces/vueComponentPropsFactory";

export class VueComponentPropsFactoryImpl extends VueComponentPropsFactory
{
  create<S extends VueComponentPropsScheme>(propsScheme: S): VueComponentPropsFactoryResult<S>
  {
    const props: Record<string, any> = reactive({});

    for (const [propName, propScheme] of Object.entries(propsScheme))
    {
      this.defineProp(props, propName, propScheme);
      this.defineEmitHandler(props, propName, propScheme);
    }

    return props as VueComponentPropsFactoryResult<S>;
  }

  private defineProp(props: Record<string, any>, propName: string, scheme: VueComponentPropScheme)
  {
    props[propName] = ref(scheme.value);
  }

  private defineEmitHandler(props: Record<string, any>, propName: string, scheme: VueComponentPropScheme)
  {
    if (!scheme.withEmit)
    {
      return;
    }

    const prop = props[propName];

    if (!prop)
    {
      throw new Error(`Prop ${ propName } not defined`);
    }

    props[`update:${ propName }`] = (value: any) =>
    {
      prop.value = value;
    }
  }
}