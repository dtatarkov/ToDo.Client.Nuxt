export type InputViewmodelData<V = any> = {
  id: string | undefined;
  name: string | undefined;
  hasAutofocus: boolean;
  value: V;
};