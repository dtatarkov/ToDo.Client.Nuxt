import { describe, it, expect } from 'vitest';
import { EntityFieldSchemeConfiguratorString } from '../../src/entities/entityFieldSchemeConfiguratorString';
import { EntityFieldSchemeConfiguratorNumber } from '../../src/entities/entityFieldSchemeConfiguratorNumber';
import { EntityFieldSchemeConfiguratorBoolean } from '../../src/entities/entityFieldSchemeConfiguratorBoolean';
import { EntityFieldSchemeConfiguratorDate } from '../../src/entities/entityFieldSchemeConfiguratorDate';
import { EntityFieldSchemeConfiguratorOptionalBase } from '../../src/entities/entityFieldSchemeConfiguratorOptionalBase';
import { EntityFieldSchemeConfiguratorDefaultedBase } from '../../src/entities/entityFieldSchemeConfiguratorDefaultedBase';
import { EntityFieldSchemeConfiguratorRequiredBase } from '../../src/entities/entityFieldSchemeConfiguratorRequiredBase';
import type { Constructor } from '@client/shared';

const configurators = [
    {
        name: 'string',
        cls: EntityFieldSchemeConfiguratorString,
        validValue: 'hello',
        invalidValue: 123,
    },
    {
        name: 'number',
        cls: EntityFieldSchemeConfiguratorNumber,
        validValue: 42,
        invalidValue: 'not-a-number',
    },
    {
        name: 'boolean',
        cls: <Constructor<EntityFieldSchemeConfiguratorOptionalBase<any>>>EntityFieldSchemeConfiguratorBoolean,
        validValue: true,
        invalidValue: 'yes',
    },
    {
        name: 'date',
        cls: EntityFieldSchemeConfiguratorDate,
        validValue: new Date('2025-01-01'),
        invalidValue: '2025-01-01',
    },
];

describe.each(configurators)('$name configurator', (config) =>
{
    describe('default (optional) field', () =>
    {
        it('should pass validation with valid value', () =>
        {
            const scheme = new config.cls().toScheme();
            const result = scheme.validate(config.validValue as any);
            expect(result).toHaveLength(0);
        });

        it('should pass validation with undefined value', () =>
        {
            const scheme = new config.cls().toScheme();
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(0);
        });

        it('should fail validation with null value', () =>
        {
            const scheme = new config.cls().toScheme();
            const result = scheme.validate(null);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should fail validation with invalid type using default error message', () =>
        {
            const scheme = new config.cls().toScheme();
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });
    });

    describe('custom error message', () =>
    {
        it('should use custom error message for invalid type', () =>
        {
            const scheme = new config.cls('todo.field.title.errors.empty').toScheme();
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('todo.field.title.errors.empty');
        });
    });

    describe('required field', () =>
    {
        it('should pass validation with valid value', () =>
        {
            const scheme = (new config.cls().required() as EntityFieldSchemeConfiguratorRequiredBase<any>).toScheme();
            const result = scheme.validate(config.validValue as any);
            expect(result).toHaveLength(0);
        });

        it('should fail validation with undefined value', () =>
        {
            const scheme = (new config.cls().required() as EntityFieldSchemeConfiguratorRequiredBase<any>).toScheme();
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.required');
        });

        it('should fail validation with null value', () =>
        {
            const scheme = (new config.cls().required() as EntityFieldSchemeConfiguratorRequiredBase<any>).toScheme();
            const result = scheme.validate(null);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.required');
        });

        it('should fail validation with invalid type', () =>
        {
            const scheme = (new config.cls().required() as EntityFieldSchemeConfiguratorRequiredBase<any>).toScheme();
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should use custom error message for undefined value', () =>
        {
            const scheme = (new config.cls().required('todo.field.title.errors.empty') as EntityFieldSchemeConfiguratorRequiredBase<any>).toScheme();
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('todo.field.title.errors.empty');
        });
    });

    describe('defaulted field', () =>
    {
        it('should pass validation with valid value', () =>
        {
            const scheme = (new config.cls().withDefault(config.validValue as any) as EntityFieldSchemeConfiguratorDefaultedBase<any>).toScheme();
            const result = scheme.validate(config.validValue as any);
            expect(result).toHaveLength(0);
        });

        it('should pass validation with undefined value', () =>
        {
            const scheme = (new config.cls().withDefault(config.validValue as any) as EntityFieldSchemeConfiguratorDefaultedBase<any>).toScheme();
            const result = scheme.validate(undefined);
            expect(result).toHaveLength(0);
        });

        it('should fail validation with null value', () =>
        {
            const scheme = (new config.cls().withDefault(config.validValue as any) as EntityFieldSchemeConfiguratorDefaultedBase<any>).toScheme();
            const result = scheme.validate(null);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should fail validation with invalid type', () =>
        {
            const scheme = (new config.cls().withDefault(config.validValue as any) as EntityFieldSchemeConfiguratorDefaultedBase<any>).toScheme();
            const result = scheme.validate(config.invalidValue as any);
            expect(result).toHaveLength(1);
            expect(result[0]?.messageKey).toBe('entity.field.invalid');
        });
    });
});
