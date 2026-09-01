import { describe, it, expect } from 'vitest';
import { EntityScheme } from '../../src/entities/entityScheme';
import { EntityParseException } from '../../src/exceptions/entityParseException';

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

        it('should throw EntityParseException on invalid type', () =>
        {
            expect(() => scheme.parse({ name: 123 })).toThrow(EntityParseException);

            try
            {
                scheme.parse({ name: 123 });
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityParseException);
                const errors = (error as EntityParseException).errors;
                expect(Object.keys(errors)).toHaveLength(1);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
            }
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

        it('should throw EntityParseException on invalid value types', () =>
        {
            expect(() => scheme.parse({
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            })).toThrow(EntityParseException);

            try
            {
                scheme.parse({
                    name: 123,
                    age: 'thirty',
                    active: 'yes',
                    createdAt: '2025-01-01',
                });
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityParseException);
                const errors = (error as EntityParseException).errors;
                expect(Object.keys(errors)).toHaveLength(4);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.active?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.invalid');
            }
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

        it('should throw EntityParseException on invalid types', () =>
        {
            const data = {
                name: 123,
                title: 456,
                age: 'thirty',
                score: 'ninety-five',
                active: 'yes',
                verified: 'maybe',
                createdAt: '2025-01-01',
                updatedAt: '2025-01-02',
            };

            expect(() => scheme.parse(data)).toThrow(EntityParseException);

            try
            {
                scheme.parse(data);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityParseException);
                const errors = (error as EntityParseException).errors;
                expect(Object.keys(errors)).toHaveLength(8);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.title?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.score?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.active?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.verified?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.updatedAt?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });
    });

    describe('unknown fields', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
            age: c.number(),
        }));

        it('should ignore unknown fields during validation', () =>
        {
            const result = scheme.validate({
                name: 'John',
                age: 30,
                extra1: 'test',
                extra2: 123,
                extra3: true,
            } as any);

            expect(Object.keys(result)).toHaveLength(0);
        });

        it('should ignore unknown fields during parse', () =>
        {
            const result = scheme.parse({
                name: 'John',
                age: 30,
                extra1: 'test',
                extra2: 123,
                extra3: true,
            } as any);

            expect(Object.keys(result).length).toBe(2);
            expect(result.name).toBe('John');
            expect(result.age).toBe(30);
        });
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
            const result = extendedScheme.validate({
                name: 'John',
                age: 30
            });

            expect(Object.keys(result)).toHaveLength(0);
        });

        it('should parse correctly', () =>
        {
            const result = extendedScheme.parse({
                name: 'John',
                age: 30
            });

            expect(result.name).toBe('John');
            expect(result.age).toBe(30);
        });
    });

    describe('invalid data', () =>
    {
        it('should fail validation for invalid fields', () =>
        {
            const result = extendedScheme.validate({
                name: 123,
                age: 'thirty'
            });

            expect(Object.keys(result)).toHaveLength(2);
            expect(result.name).toHaveLength(1);
            expect(result.age).toHaveLength(1);
        });

        it('should throw EntityParseException for invalid fields', () =>
        {
            expect(() => extendedScheme.parse({
                name: 123,
                age: 'thirty'
            })).toThrow(EntityParseException);

            try
            {
                extendedScheme.parse({
                    name: 123,
                    age: 'thirty'
                });
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityParseException);
                const errors = (error as EntityParseException).errors;
                expect(Object.keys(errors)).toHaveLength(2);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
            }
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

    it('should throw EntityParseException when required field is missing during parse', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string().required(),
            age: c.number().required(),
            active: c.boolean().required(),
            createdAt: c.datetime().required(),
        }));

        const data = {
            name: 'John',
            age: 30,
            active: true,
        } as any;

        expect(() => scheme.parse(data)).toThrow(EntityParseException);

        try
        {
            scheme.parse(data);
        }
        catch (error)
        {
            expect(error).toBeInstanceOf(EntityParseException);
            const errors = (error as EntityParseException).errors;
            expect(Object.keys(errors)).toHaveLength(1);
            expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.required');
        }
    });

    it('should throw EntityParseException when required field has wrong type during parse', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string().required(),
            age: c.number().required(),
            active: c.boolean().required(),
            createdAt: c.datetime().required(),
        }));

        const data = {
            name: 123,
            age: 'thirty',
            active: 'yes',
            createdAt: '2025-01-01',
        } as any;

        expect(() => scheme.parse(data)).toThrow(EntityParseException);

        try
        {
            scheme.parse(data);
        }
        catch (error)
        {
            expect(error).toBeInstanceOf(EntityParseException);
            const errors = (error as EntityParseException).errors;
            expect(Object.keys(errors)).toHaveLength(4);
            expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(errors.active?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.invalid');
        }
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

    it('should throw EntityParseException when defaulted field has wrong type', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            status: c.string().withDefault('active'),
            priority: c.number().withDefault(1),
            verified: c.boolean().withDefault(false),
            expiresAt: c.datetime().withDefault(new Date('2026-01-01')),
        }));

        const data = {
            status: 123,
            priority: 'high',
            verified: 'yes',
            expiresAt: '2026-01-01',
        };

        expect(() => scheme.parse(data)).toThrow(EntityParseException);

        try
        {
            scheme.parse(data);
        }
        catch (error)
        {
            expect(error).toBeInstanceOf(EntityParseException);
            const errors = (error as EntityParseException).errors;
            expect(Object.keys(errors)).toHaveLength(4);
            expect(errors.status?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(errors.priority?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(errors.verified?.[0]?.messageKey).toBe('entity.field.invalid');
            expect(errors.expiresAt?.[0]?.messageKey).toBe('entity.field.invalid');
        }
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