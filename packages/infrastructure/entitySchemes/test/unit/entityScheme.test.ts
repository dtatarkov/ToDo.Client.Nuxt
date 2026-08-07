import { describe, it, expect } from 'vitest';
import { EntityScheme } from '../../src/entities/entityScheme';

describe('EntityScheme', () =>
{
    describe('simple scheme with single string field', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
        }));

        it('should pass validation with valid string value', () =>
        {
            const result = scheme.validate({ name: 'John' });
            expect(Object.keys(result).length).toBe(0);
        });

        it('should fail validation with invalid type', () =>
        {
            const result = scheme.validate({ name: 123 });
            expect(result.name).toHaveLength(1);
            expect(result.name?.[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should parse valid string value', () =>
        {
            const result = scheme.parse({ name: 'John' });
            expect(result.name).toBe('John');
        });

        it('should throw EntityFieldParseException on invalid type', () =>
        {
            expect(() => scheme.parse({ name: 123 })).toThrow();
        });

        it('should match individual field validation with full object validation', () =>
        {
            const invalid = { name: 123 };

            const fieldResult = scheme.fields.name.validate(invalid.name);
            const objectResult = scheme.validate(invalid);

            expect(fieldResult).toEqual(objectResult.name);
        });

        it('should match individual field parsing with full object parsing', () =>
        {
            const data = { name: 'John' };

            const fieldResult = scheme.fields.name.parse(data.name);
            const objectResult = scheme.parse(data);

            expect(fieldResult).toBe(objectResult.name);
        });
    });

    describe('complex scheme with all field types', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
            age: c.number(),
            active: c.boolean(),
            createdAt: c.datetime(),
        }));

        it('should pass validation with valid values for all fields', () =>
        {
            const result = scheme.validate({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            });

            expect(Object.keys(result).length).toBe(0);
        });

        it('should fail validation with invalid types for all fields', () =>
        {
            const result = scheme.validate({
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            });

            expect(result.name).toHaveLength(1);
            expect(result.age).toHaveLength(1);
            expect(result.active).toHaveLength(1);
            expect(result.createdAt).toHaveLength(1);
        });

        it('should fail validation with mixed valid/invalid data', () =>
        {
            const result = scheme.validate({
                name: 'John',
                age: 'thirty',
                active: true,
                createdAt: '2025-01-01',
            });

            expect(Object.keys(result).length).toBe(2);
            expect(result.age).toHaveLength(1);
            expect(result.createdAt).toHaveLength(1);
        });

        it('should parse valid values for all fields', () =>
        {
            const result = scheme.parse({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            });

            expect(result.name).toBe('John');
            expect(result.age).toBe(30);
            expect(result.active).toBe(true);
            expect(result.createdAt).toEqual(new Date('2025-01-01'));
        });

        it('should throw EntityFieldParseException on invalid types', () =>
        {
            expect(() => scheme.parse({
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            })).toThrow();
        });
    });

    describe('double complex scheme with two fields for all types', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
            title: c.string(),
            age: c.number(),
            score: c.number(),
            active: c.boolean(),
            verified: c.boolean(),
            createdAt: c.datetime(),
            updatedAt: c.datetime(),
        }));

        it('should pass validation with valid values for all fields', () =>
        {
            const result = scheme.validate({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            });

            expect(Object.keys(result).length).toBe(0);
        });

        it('should fail validation with invalid types for some fields', () =>
        {
            const result = scheme.validate({
                name: 'John',
                title: 123,
                age: 30,
                score: 'ninety-five',
                active: true,
                verified: 'maybe',
                createdAt: new Date('2025-01-01'),
                updatedAt: '2025-01-02',
            });

            expect(Object.keys(result).length).toBe(4);

            expect(result.title).toHaveLength(1);
            expect(result.score).toHaveLength(1);
            expect(result.verified).toHaveLength(1);
            expect(result.updatedAt).toHaveLength(1);
        });

        it('should fail validation with mixed valid/invalid data', () =>
        {
            const result = scheme.validate({
                name: 'John',
                title: 123,
                age: 30,
                score: 'ninety-five',
                active: true,
                verified: 'maybe',
                createdAt: new Date('2025-01-01'),
                updatedAt: '2025-01-02',
            });

            expect(Object.keys(result).length).toBe(4);

            expect(result.title).toHaveLength(1);
            expect(result.score).toHaveLength(1);
            expect(result.verified).toHaveLength(1);
            expect(result.updatedAt).toHaveLength(1);
        });

        it('should parse valid values for all fields', () =>
        {
            const result = scheme.parse({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            });

            expect(result.name).toBe('John');
            expect(result.title).toBe('Developer');
            expect(result.age).toBe(30);
            expect(result.score).toBe(95);
            expect(result.active).toBe(true);
            expect(result.verified).toBe(false);
            expect(result.createdAt).toEqual(new Date('2025-01-01'));
            expect(result.updatedAt).toEqual(new Date('2025-01-02'));
        });

        it('should throw EntityFieldParseException on invalid types', () =>
        {
            expect(() => scheme.parse({
                name: 123,
                title: 456,
                age: 'thirty',
                score: 'ninety-five',
                active: 'yes',
                verified: 'maybe',
                createdAt: '2025-01-01',
                updatedAt: '2025-01-02',
            })).toThrow();
        });
    });

    describe('individual fields validation/parse should match full object validation/parse', () =>
    {
        it('should match single field validation', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string(),
            }));

            const invalid = { name: 123 };

            const fieldResult = scheme.fields.name.validate(invalid.name);
            const objectResult = scheme.validate(invalid);

            expect(fieldResult).toEqual(objectResult.name);
        });

        it('should match single field parsing', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string(),
            }));

            const data = { name: 'John' };

            const fieldResult = scheme.fields.name.parse(data.name);
            const objectResult = scheme.parse(data);

            expect(fieldResult).toBe(objectResult.name);
        });

        it('should match all field types', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string(),
                age: c.number(),
                active: c.boolean(),
                createdAt: c.datetime(),
            }));

            const validateData = {
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            };

            const parseData = {
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            };

            const fieldValidateResults = {
                name: scheme.fields.name.validate(validateData.name),
                age: scheme.fields.age.validate(validateData.age),
                active: scheme.fields.active.validate(validateData.active),
                createdAt: scheme.fields.createdAt.validate(validateData.createdAt),
            };

            const objectValidateResult = scheme.validate(validateData);

            expect(fieldValidateResults.name).toEqual(objectValidateResult.name ?? []);
            expect(fieldValidateResults.age).toEqual(objectValidateResult.age ?? []);
            expect(fieldValidateResults.active).toEqual(objectValidateResult.active ?? []);
            expect(fieldValidateResults.createdAt).toEqual(objectValidateResult.createdAt ?? []);

            const fieldParseResults = {
                name: scheme.fields.name.parse(parseData.name),
                age: scheme.fields.age.parse(parseData.age),
                active: scheme.fields.active.parse(parseData.active),
                createdAt: scheme.fields.createdAt.parse(parseData.createdAt),
            };

            const objectParseResult = scheme.parse(parseData);

            expect(fieldParseResults.name).toBe(objectParseResult.name);
            expect(fieldParseResults.age).toBe(objectParseResult.age);
            expect(fieldParseResults.active).toBe(objectParseResult.active);
            expect(fieldParseResults.createdAt).toBe(objectParseResult.createdAt);
        });
    });

    describe('unknown fields in data', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
            age: c.number(),
        }));

        it('should include single unknown field', () =>
        {
            const result = scheme.validate({ name: 'John', age: 30, extra: 'test' });

            expect(Object.keys(result)).toHaveLength(1);
            expect((result).extra?.[0]?.messageKey).toBe('entity.field.unknown');
        });

        it('should include multiple unknown fields', () =>
        {
            const result = scheme.validate({
                name: 'John',
                age: 30,
                extra1: 'test',
                extra2: 123,
            });

            expect(Object.keys(result)).toHaveLength(2);
            expect(result.extra1?.[0]?.messageKey).toBe('entity.field.unknown');
            expect(result.extra2?.[0]?.messageKey).toBe('entity.field.unknown');
        });

        it('should include unknown fields alongside validation errors', () =>
        {
            const result = scheme.validate({
                name: 123,
                age: 30,
                extra: 'test',
            });

            expect(Object.keys(result)).toHaveLength(2);
            expect(result.name?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(result.extra?.[0]?.messageKey).toBe('entity.field.unknown');
        });
    });

    describe('extend method', () =>
    {
        const extendedScheme = EntityScheme.create((c) => ({
            name: c.string(),
        })).extend((c) => ({
            age: c.number(),
        }));

        describe('valid data', () =>
        {
            it('should pass validation', () =>
            {
                const result = extendedScheme.validate({ name: 'John', age: 30 });
                expect(Object.keys(result)).toHaveLength(0);
            });

            it('should parse correctly', () =>
            {
                const result = extendedScheme.parse({ name: 'John', age: 30 });
                expect(result.name).toBe('John');
                expect(result.age).toBe(30);
            });
        });

        describe('invalid data', () =>
        {
            it('should fail validation for invalid fields', () =>
            {
                const result = extendedScheme.validate({ name: 123, age: 'thirty' });
                expect(Object.keys(result)).toHaveLength(2);
                expect(result.name).toHaveLength(1);
                expect(result.age).toHaveLength(1);
            });

            it('should fail parsing for invalid fields', () =>
            {
                expect(() => extendedScheme.parse({ name: 123, age: 'thirty' })).toThrow();
            });
        });

        describe('extra fields not in scheme', () =>
        {
            it('should report unknown fields in validation', () =>
            {
                const result = extendedScheme.validate({ name: 'John', age: 30, extra: 'test' });
                expect(result.extra).toHaveLength(1);
                expect(result.extra?.[0]?.messageKey).toBe('entity.field.unknown');
            });
        });
    });

    describe('required fields', () =>
    {
        it('should pass validation when all required fields are present', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
                createdAt: c.datetime().required(),
            }));

            const result = scheme.validate({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            });
            expect(Object.keys(result)).toHaveLength(0);
        });

        it('should fail validation when required field is missing', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
                createdAt: c.datetime().required(),
            }));

            const result = scheme.validate({
                name: 'John',
                age: 30,
                active: true,
            });

            expect(result.createdAt).toHaveLength(1);
            expect(result.createdAt?.[0]?.messageKey).toBe('entity.field.required');
        });

        it('should fail validation when required field is undefined', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
                createdAt: c.datetime().required(),
            }));

            const result = scheme.validate({
                name: undefined,
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            });

            expect(result.name).toHaveLength(1);
            expect(result.name?.[0]?.messageKey).toBe('entity.field.required');
        });

        it('should fail validation when required field has wrong type', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
                createdAt: c.datetime().required(),
            }));

            const result = scheme.validate({
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            });

            expect(result.name).toHaveLength(1);
            expect(result.name?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(result.age).toHaveLength(1);
            expect(result.age?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(result.active).toHaveLength(1);
            expect(result.active?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(result.createdAt).toHaveLength(1);
            expect(result.createdAt?.[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should parse correctly when required fields are present', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
                createdAt: c.datetime().required(),
            }));

            const result = scheme.parse({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            });

            expect(result.name).toBe('John');
            expect(result.age).toBe(30);
            expect(result.active).toBe(true);
            expect(result.createdAt).toEqual(new Date('2025-01-01'));
        });

        it('should throw when required field is missing during parse', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
                createdAt: c.datetime().required(),
            }));

            expect(() => scheme.parse({
                name: 'John',
                age: 30,
                active: true,
            } as any)).toThrow();
        });

        it('should throw when required field has wrong type during parse', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
                createdAt: c.datetime().required(),
            }));

            expect(() => scheme.parse({
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            } as any)).toThrow();
        });
    });

    describe('defaulted fields', () =>
    {
        it('should pass validation when defaulted field is present', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                status: c.string().withDefault('active'),
                priority: c.number().withDefault(1),
                verified: c.boolean().withDefault(false),
                expiresAt: c.datetime().withDefault(new Date('2026-01-01')),
            }));

            const result = scheme.validate({
                status: 'inactive',
                priority: 5,
                verified: true,
                expiresAt: new Date('2027-01-01'),
            });

            expect(Object.keys(result)).toHaveLength(0);
        });

        it('should pass validation when defaulted field is missing', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                status: c.string().withDefault('active'),
                priority: c.number().withDefault(1),
                verified: c.boolean().withDefault(false),
                expiresAt: c.datetime().withDefault(new Date('2026-01-01')),
            }));

            const result = scheme.validate({});
            expect(Object.keys(result)).toHaveLength(0);
        });

        it('should parse with default value when defaulted field is missing', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                status: c.string().withDefault('active'),
                priority: c.number().withDefault(1),
                verified: c.boolean().withDefault(false),
                expiresAt: c.datetime().withDefault(new Date('2026-01-01')),
            }));

            const result = scheme.parse({});
            expect(result.status).toBe('active');
            expect(result.priority).toBe(1);
            expect(result.verified).toBe(false);
            expect(result.expiresAt).toEqual(new Date('2026-01-01'));
        });

        it('should parse with provided value when defaulted field is present', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                status: c.string().withDefault('active'),
                priority: c.number().withDefault(1),
                verified: c.boolean().withDefault(false),
                expiresAt: c.datetime().withDefault(new Date('2026-01-01')),
            }));

            const result = scheme.parse({
                status: 'inactive',
                priority: 10,
                verified: true,
                expiresAt: new Date('2028-01-01'),
            });

            expect(result.status).toBe('inactive');
            expect(result.priority).toBe(10);
            expect(result.verified).toBe(true);
            expect(result.expiresAt).toEqual(new Date('2028-01-01'));
        });

        it('should fail validation when defaulted field has wrong type', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                status: c.string().withDefault('active'),
                priority: c.number().withDefault(1),
                verified: c.boolean().withDefault(false),
                expiresAt: c.datetime().withDefault(new Date('2026-01-01')),
            }));

            const result = scheme.validate({
                status: 123,
                priority: 'high',
                verified: 'yes',
                expiresAt: '2026-01-01',
            });

            expect(result.status).toHaveLength(1);
            expect(result.status?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(result.priority).toHaveLength(1);
            expect(result.priority?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(result.verified).toHaveLength(1);
            expect(result.verified?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(result.expiresAt).toHaveLength(1);
            expect(result.expiresAt?.[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should fail parsing when defaulted field has wrong type', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                status: c.string().withDefault('active'),
                priority: c.number().withDefault(1),
                verified: c.boolean().withDefault(false),
                expiresAt: c.datetime().withDefault(new Date('2026-01-01')),
            }));

            expect(() => scheme.parse({
                status: 123,
                priority: 'high',
                verified: 'yes',
                expiresAt: '2026-01-01',
            })).toThrow();
        });
    });

    describe('mixed fields (optional/defaulted/required)', () =>
    {
        it('should pass validation with all fields present', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number(),
                status: c.string().withDefault('active'),
                verified: c.boolean().withDefault(false),
                score: c.number().required(),
            }));

            const result = scheme.validate({
                name: 'John',
                age: 30,
                status: 'inactive',
                verified: true,
                score: 95,
            });

            expect(Object.keys(result)).toHaveLength(0);
        });

        it('should pass validation with only required fields present', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number(),
                status: c.string().withDefault('active'),
                verified: c.boolean().withDefault(false),
                score: c.number().required(),
            }));

            const result = scheme.validate({
                name: 'John',
                score: 95,
            });

            expect(Object.keys(result)).toHaveLength(0);
        });

        it('should fail validation for invalid required field', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number(),
                status: c.string().withDefault('active'),
                score: c.number().required(),
            }));

            const result = scheme.validate({
                name: 123,
                score: 95,
            });

            expect(result.name).toHaveLength(1);
            expect(result.name?.[0]?.messageKey).toBe('entity.field.invalid');
        });

        it('should fail validation for missing required field', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number(),
                status: c.string().withDefault('active'),
                score: c.number().required(),
            }));

            const result = scheme.validate({
                name: 'John',
            });

            expect(result.score).toHaveLength(1);
            expect(result.score?.[0]?.messageKey).toBe('entity.field.required');
        });

        it('should parse with defaults for missing optional/defaulted fields', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number(),
                status: c.string().withDefault('active'),
                verified: c.boolean().withDefault(false),
                score: c.number().required(),
            }));

            const result = scheme.parse({
                name: 'John',
                score: 95,
            });

            expect(result.name).toBe('John');
            expect(result.age).toBeUndefined();
            expect(result.status).toBe('active');
            expect(result.verified).toBe(false);
            expect(result.score).toBe(95);
        });

        it('should parse with provided values overriding defaults', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number(),
                status: c.string().withDefault('active'),
                verified: c.boolean().withDefault(false),
                score: c.number().required(),
            }));

            const result = scheme.parse({
                name: 'Jane',
                age: 25,
                status: 'inactive',
                verified: true,
                score: 88,
            });

            expect(result.name).toBe('Jane');
            expect(result.age).toBe(25);
            expect(result.status).toBe('inactive');
            expect(result.verified).toBe(true);
            expect(result.score).toBe(88);
        });

        it('should fail validation for mixed valid/invalid data', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number(),
                status: c.string().withDefault('active'),
                score: c.number().required(),
            }));

            const result = scheme.validate({
                name: 123,
                age: 'twenty',
                status: 'active',
                score: 95,
            });

            expect(Object.keys(result)).toHaveLength(2);
            expect(result.name).toHaveLength(1);
            expect(result.age).toHaveLength(1);
        });
    });
});
