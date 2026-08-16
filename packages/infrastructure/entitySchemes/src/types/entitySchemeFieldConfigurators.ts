import type { EntityFieldSchemeConfigurator } from '../entities/entityFieldSchemeConfigurator';

export type EntitySchemeFieldConfigurators<TInput extends Record<string, any>, TOutput extends Record<string, any> = TInput> = {
    [K in keyof TInput]: EntityFieldSchemeConfigurator<TInput[K], TOutput extends Record<string, any> ? TOutput[K & keyof TOutput] : never>;
};

export type EntityFieldConfiguratorInput<T extends Record<string, EntityFieldSchemeConfigurator<any, any>>> = {
    [K in keyof T]: T[K] extends EntityFieldSchemeConfigurator<infer TI, any> ? TI : never;
};

export type EntityFieldConfiguratorOutput<T extends Record<string, EntityFieldSchemeConfigurator<any, any>>> = {
    [K in keyof T]: T[K] extends EntityFieldSchemeConfigurator<any, infer TO> ? TO : never;
};