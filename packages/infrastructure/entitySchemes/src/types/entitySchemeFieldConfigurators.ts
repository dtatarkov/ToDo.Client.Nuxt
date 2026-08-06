import type { EntityFieldSchemeConfigurator } from '../entities/entityFieldSchemeConfigurator';

export type EntitySchemeFieldConfigurators<TEntity extends Record<string, any>> = {
    [K in keyof TEntity]: EntityFieldSchemeConfigurator<any>;
};
