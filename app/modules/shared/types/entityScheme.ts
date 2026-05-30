import type { EntityFieldScheme } from './entityFieldScheme';

export type EntityScheme<TEntity extends Record<string, any>> = {
    [K in keyof TEntity]: EntityFieldScheme
};