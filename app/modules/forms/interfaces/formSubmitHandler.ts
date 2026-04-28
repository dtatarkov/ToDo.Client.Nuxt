export abstract class FormSubmitHandler<TEntity extends Record<string, any> = Record<string, any>>
{
    abstract submit(data: Record<keyof TEntity, any>): Promise<void>;
}