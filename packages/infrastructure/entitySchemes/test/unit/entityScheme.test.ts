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
});
