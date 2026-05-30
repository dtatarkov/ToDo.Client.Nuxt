export abstract class EntityValidator<TEntity extends Record<string, any> = Record<string, any>>
{
    abstract validateField<K extends keyof TEntity>(field: K, value: TEntity[K]): string | undefined;
}