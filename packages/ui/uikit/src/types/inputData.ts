export type InputData<V = any> = {
    id?: string;
    name?: string;
    value?: V;
    hasAutofocus?: boolean;
    isDisabled?: boolean;
    hasError?: boolean;
};
