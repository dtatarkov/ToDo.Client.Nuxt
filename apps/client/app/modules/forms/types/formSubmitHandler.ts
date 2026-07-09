import type { Func } from '@client/shared';

export type FormSubmitHandler<TEntity extends Record<string, any>> = Func<Promise<void>, [Record<keyof TEntity, any>]>;