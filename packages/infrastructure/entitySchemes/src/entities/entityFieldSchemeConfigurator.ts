import type { MessageKey } from '@client/infrastructure-messages';
import type { NonUndefined } from '@client/shared';

export interface EntityFieldSchemeConfigurator<TInput, TOutput>
{
    __ti: TInput;
    __to: TOutput;
}

export interface EntityFieldSchemeConfiguratorDefaulted<TValue> extends EntityFieldSchemeConfigurator<TValue | undefined, NonUndefined<TValue>>
{
}

export interface EntityFieldSchemeConfiguratorOptional<TValue> extends EntityFieldSchemeConfigurator<TValue | undefined, TValue | undefined>
{
    required(messageKey?: MessageKey): EntityFieldSchemeConfiguratorRequired<TValue>;
    withDefault(value: TValue): EntityFieldSchemeConfiguratorDefaulted<TValue>;
}

export interface EntityFieldSchemeConfiguratorRequired<TValue> extends EntityFieldSchemeConfigurator<NonUndefined<TValue>, NonUndefined<TValue>>
{
}