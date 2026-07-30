export abstract class FormDataContext<TEntity extends Record<string, any>>
{
    abstract getData(): Record<keyof TEntity, any>;
    abstract setData(changeData: Partial<Record<keyof TEntity, any>>): void;
}