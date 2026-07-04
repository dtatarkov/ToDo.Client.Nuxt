import type { Func } from '@/modules/shared/types/func';

export type FormSubmitHandler<TEntity extends Record<string, any>> = Func<Promise<void>, [Record<keyof TEntity, any>]>;