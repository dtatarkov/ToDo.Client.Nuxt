export type ModalContentData<TData extends Record<string, any> = Record<string, any>> = {
    renderKey: symbol;
    data: TData;
};
