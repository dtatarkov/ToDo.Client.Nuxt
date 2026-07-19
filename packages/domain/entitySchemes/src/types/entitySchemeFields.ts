import type { EntityFieldScheme } from '../entities/entityFieldScheme';

export type EntitySchemeFields<TEntity extends Record<string, any>> = {
    [K in keyof TEntity]: EntityFieldScheme;
};
