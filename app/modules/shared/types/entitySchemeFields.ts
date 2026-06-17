import type { EntityFieldScheme } from '../entities/EntityFieldScheme';

export type EntitySchemeFields<TEntity extends Record<string, any>> = {
    [K in keyof TEntity]: EntityFieldScheme;
};
