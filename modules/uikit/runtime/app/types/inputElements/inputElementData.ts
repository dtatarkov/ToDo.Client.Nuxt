export type InputElementData<V = any> = {
  id: string | undefined;
  name: string | undefined;
  autofocus: boolean;
  value: V;
}