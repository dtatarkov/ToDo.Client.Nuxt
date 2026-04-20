import { VueComponentPropsFactory } from "../interfaces/vueComponentPropsFactory";

export class VueComponentPropsFactoryImpl extends VueComponentPropsFactory
{
  create<Props extends Record<string, any>>(propsScheme: VueComponentPropsScheme<Props>): Props
  {
    const props: Record<string, any> = {};

    for (const [propName, propScheme] of Object.entries(propsScheme))
    {
      this.defineProp(props, propName, propScheme);
      this.defineEmitHandler(props, propName, propScheme);
    }

    return reactive(props) as Props;
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
      throw new Error(`Prop ${propName} not defined`);
    }

    props[`onUpdate:${propName}`] = (value: any) =>
    {
      prop.value = value;
    };
  }
}