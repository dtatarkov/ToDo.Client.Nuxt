import type { EntityFieldScheme } from '../entities/entityFieldScheme';

export type EntitySchemeFields<TValue extends Record<string, any>> = {
    [K in keyof TValue]: EntityFieldScheme<TValue[K]>;
};
