import type { MessageKey } from '@client/infrastructure-messages';
import type { NonUndefined } from '@client/shared';

export interface EntityFieldSchemeConfigurator<TValue>
{
    __t: TValue;
}

export interface EntityFieldSchemeConfiguratorDefaulted<TValue> extends EntityFieldSchemeConfigurator<TValue>
{
}

export interface EntityFieldSchemeConfiguratorOptional<TValue> extends EntityFieldSchemeConfigurator<TValue | undefined>
{
    required(messageKey?: MessageKey): EntityFieldSchemeConfiguratorRequired<TValue>;
    withDefault(value: TValue): EntityFieldSchemeConfiguratorDefaulted<TValue>;
}

export interface EntityFieldSchemeConfiguratorRequired<TValue> extends EntityFieldSchemeConfigurator<NonUndefined<TValue>>
{
}