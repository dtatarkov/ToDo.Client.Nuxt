import { describe, it, expect } from 'vitest';
import { EntityFieldSchemeConfiguratorString } from '../../src/entities/entityFieldSchemeConfiguratorString';
import { EntityFieldSchemeConfiguratorNumber } from '../../src/entities/entityFieldSchemeConfiguratorNumber';
import { EntityFieldSchemeConfiguratorBoolean } from '../../src/entities/entityFieldSchemeConfiguratorBoolean';
import { EntityFieldSchemeConfiguratorDate } from '../../src/entities/entityFieldSchemeConfiguratorDate';
import { EntityFieldSchemeConfiguratorEnum } from '../../src/entities/entityFieldSchemeConfiguratorEnum';
import { EntityFieldSchemeConfiguratorOptionalBase } from '../../src/entities/entityFieldSchemeConfiguratorOptionalBase';
import type { EntityFieldScheme } from '../../src/entities/entityFieldScheme';
import type { MessageKey } from '@client/infrastructure-messages';
import { EntityFieldSchemeConfiguratorBase } from '../../src/entities/entityFieldSchemeConfiguratorBase';
import type { EntityFieldSchemeConfigurator } from '../../src/entities/entityFieldSchemeConfigurator';

function toScheme<TInput, TOutput extends TInput>(configurator: EntityFieldSchemeConfigurator<TInput, TOutput>): EntityFieldScheme<TInput>
{
    if (configurator instanceof EntityFieldSchemeConfiguratorBase)
    {
        return configurator.toScheme();
    }

    throw new Error('invalid configurator');
}

const configurators = [
    {
        name: 'string',
        factory: (messageKey?: MessageKey) =>
            new EntityFieldSchemeConfiguratorString(messageKey) as EntityFieldSchemeConfiguratorOptionalBase<any>,
        validValue: 'hello',
        invalidValue: 123,
    },
    {
        name: 'number',
        factory: (messageKey?: MessageKey) =>
            new EntityFieldSchemeConfiguratorNumber(messageKey) as EntityFieldSchemeConfiguratorOptionalBase<any>,
        validValue: 42,
        invalidValue: 'not-a-number',
    },
    {
        name: 'boolean',
        factory: (messageKey?: MessageKey) =>
            new EntityFieldSchemeConfiguratorBoolean(messageKey) as EntityFieldSchemeConfiguratorOptionalBase<any>,
        validValue: true,
        invalidValue: 'yes',
    },
    {
        name: 'date',
        factory: (messageKey?: MessageKey) =>
            new EntityFieldSchemeConfiguratorDate(messageKey) as EntityFieldSchemeConfiguratorOptionalBase<any>,
        validValue: new Date('2025-01-01'),
        invalidValue: '2025-01-01',
    },
    {
        name: 'enum',
        factory: (messageKey?: MessageKey) =>
            new EntityFieldSchemeConfiguratorEnum(['open', 'done'] as const, messageKey) as EntityFieldSchemeConfiguratorOptionalBase<any>,
        validValue: 'open',
        invalidValue: 'closed',
    },
];

describe.each(configurators)('$name configurator', (config) =>
{
    describe('default (optional) field', () =>
    {
        it('should pass validation with valid value', () =>
        {
            const scheme = toScheme(config.factory());
            const result = scheme.validate(config.validValue as any);
            expect(result).toHaveLength(0);
        });

        it('should pass validation with undefined value', () =>
        {
            const scheme = toScheme(config.factory());
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(0);
        });

        it('should fail validation with null value', () =>
        {
            const scheme = toScheme(config.factory());
            const result = scheme.validate(null);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should fail validation with invalid type using default error message', () =>
        {
            const scheme = toScheme(config.factory());
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });
    });

    describe('custom error message', () =>
    {
        it('should use custom error message for invalid type', () =>
        {
            const scheme = toScheme(config.factory('todo.field.title.errors.empty'));
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('todo.field.title.errors.empty');
        });
    });

    describe('required field', () =>
    {
        it('should pass validation with valid value', () =>
        {
            const scheme = toScheme(config.factory().required());
            const result = scheme.validate(config.validValue as any);
            expect(result).toHaveLength(0);
        });

        it('should fail validation with undefined value', () =>
        {
            const scheme = toScheme(config.factory().required());
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.required');
        });

        it('should fail validation with null value', () =>
        {
            const scheme = toScheme(config.factory().required());
            const result = scheme.validate(null);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.required');
        });

        it('should fail validation with invalid type', () =>
        {
            const scheme = toScheme(config.factory().required());
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should use custom error message for undefined value', () =>
        {
            const scheme = toScheme(config.factory().required('todo.field.title.errors.empty'));
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('todo.field.title.errors.empty');
        });
    });

    describe('defaulted field', () =>
    {
        it('should pass validation with valid value', () =>
        {
            const scheme = toScheme(config.factory().withDefault(config.validValue as any));
            const result = scheme.validate(config.validValue as any);
            expect(result).toHaveLength(0);
        });

        it('should pass validation with undefined value', () =>
        {
            const scheme = toScheme(config.factory().withDefault(config.validValue as any));
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(0);
        });

        it('should fail validation with null value', () =>
        {
            const scheme = toScheme(config.factory().withDefault(config.validValue as any));
            const result = scheme.validate(null);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should fail validation with invalid type', () =>
        {
            const scheme = toScheme(config.factory().withDefault(config.validValue as any));
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });
    });
});
