export type FormElementData<V = any> = {
  label?: string;
  name?: string;
  validate?: (value: V) => string | undefined;
};