import type { Func } from '@client/shared';

export type FormHandlers<TEntity extends Record<string, any>> = {
    submit: Func<Promise<void>, [Record<keyof TEntity, any>]>;
};