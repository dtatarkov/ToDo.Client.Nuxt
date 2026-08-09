import { describe, it, expect } from 'vitest';
import { EntityScheme } from '../../src/entities/entityScheme';
import { EntityData } from '../../src/entities/entityData';
import { EntityDataUpdateException } from '../../src/exceptions/entityDataUpdateException';
import { EntityParseException } from '../../src/exceptions/entityParseException';

describe('EntityData', () =>
{
    describe('constructor', () =>
    {
        it('should initialize with valid data', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
            }));

            const data = new EntityData({ name: 'John' }, scheme);
            expect(data.value.name).toBe('John');
        });

        it('should throw EntityParseException on invalid initial data', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
            }));

            expect(() => new EntityData({} as any, scheme))
                .toThrow(EntityParseException);

            try
            {
                new EntityData({} as any, scheme);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityParseException);
                const errors = (error as EntityParseException).errors;
                expect(Object.keys(errors)).toHaveLength(1);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.required');
            }
        });

        it('should throw EntityParseException on multiple invalid initial fields', () =>
        {
            const scheme = EntityScheme.create((c) => ({
                name: c.string().required(),
                age: c.number().required(),
                active: c.boolean().required(),
            }));

            const data = {
                name: 123,
                age: 'thirty',
                active: 'yes',
            } as any;

            expect(() => new EntityData(data, scheme)).toThrow(EntityParseException);

            try
            {
                new EntityData(data, scheme);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityParseException);
                const errors = (error as EntityParseException).errors;
                expect(Object.keys(errors)).toHaveLength(3);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.active?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });
    });

    describe('simple data with single string field', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
        }));

        it('should initialize with provided data', () =>
        {
            const data = new EntityData({ name: 'John' }, scheme);
            expect(data.value.name).toBe('John');
        });

        it('should update with valid string value', () =>
        {
            const data = new EntityData({ name: 'John' }, scheme);
            data.update({ name: 'Jane' });
            expect(data.value.name).toBe('Jane');
        });

        it('should throw EntityDataUpdateException on invalid value type', () =>
        {
            const data = new EntityData({ name: 'John' }, scheme);

            expect(() => data.update({ name: 123 } as any)).toThrow(EntityDataUpdateException);

            try
            {
                data.update({ name: 123 } as any);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(1);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });
    });

    describe('complex data with fields of all types', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
            age: c.number(),
            active: c.boolean(),
            createdAt: c.datetime(),
        }));

        it('should initialize with provided data', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            expect(data.value.name).toBe('John');
            expect(data.value.age).toBe(30);
            expect(data.value.active).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-01-01'));
        });

        it('should update with valid values for all fields', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            data.update({
                name: 'Jane',
                age: 25,
                active: false,
                createdAt: new Date('2025-06-01'),
            });

            expect(data.value.name).toBe('Jane');
            expect(data.value.age).toBe(25);
            expect(data.value.active).toBe(false);
            expect(data.value.createdAt).toEqual(new Date('2025-06-01'));
        });

        it('should throw EntityDataUpdateException on invalid value types', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            const updateData = {
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            } as any;

            expect(() => data.update(updateData)).toThrow(EntityDataUpdateException);

            try
            {
                data.update(updateData);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(4);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.active?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });

        it('should update with partial valid data', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            data.update({
                name: 'Jane',
                age: 25,
            });

            expect(data.value.name).toBe('Jane');
            expect(data.value.age).toBe(25);
            expect(data.value.active).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-01-01'));
        });

        it('should throw EntityDataUpdateException on partial invalid data', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            const updateData = {
                name: 123,
                age: 'thirty',
            } as any;

            expect(() => data.update(updateData)).toThrow(EntityDataUpdateException);

            try
            {
                data.update(updateData);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(2);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });
    });

    describe('complex required data with fields of all types', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string().required(),
            age: c.number().required(),
            active: c.boolean().required(),
            createdAt: c.datetime().required(),
        }));

        it('should initialize with provided data', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            expect(data.value.name).toBe('John');
            expect(data.value.age).toBe(30);
            expect(data.value.active).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-01-01'));
        });

        it('should update with valid values for all fields', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            data.update({
                name: 'Jane',
                age: 25,
                active: false,
                createdAt: new Date('2025-06-01'),
            });

            expect(data.value.name).toBe('Jane');
            expect(data.value.age).toBe(25);
            expect(data.value.active).toBe(false);
            expect(data.value.createdAt).toEqual(new Date('2025-06-01'));
        });

        it('should throw EntityDataUpdateException on undefined update', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            expect(() => data.update({
                name: undefined,
                age: undefined,
                active: undefined,
                createdAt: undefined,
            })).toThrow(EntityDataUpdateException);

            try
            {
                data.update({
                    name: undefined,
                    age: undefined,
                    active: undefined,
                    createdAt: undefined,
                });
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);

                const errors = (error as EntityDataUpdateException).errors;

                expect(Object.keys(errors)).toHaveLength(4);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.required');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.required');
                expect(errors.active?.[0]?.messageKey).toBe('entity.field.required');
                expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.required');
            }
        });

        it('should throw EntityDataUpdateException on invalid types', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            const updateData = {
                name: 123,
                age: 'thirty',
                active: 'yes',
                createdAt: '2025-01-01',
            } as any;

            expect(() => data.update(updateData)).toThrow(EntityDataUpdateException);

            try
            {
                data.update(updateData);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(4);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.active?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });

        it('should update with partial valid data', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            data.update({
                name: 'Jane',
                age: 25,
            });

            expect(data.value.name).toBe('Jane');
            expect(data.value.age).toBe(25);
            expect(data.value.active).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-01-01'));
        });

        it('should throw EntityDataUpdateException on partial invalid data', () =>
        {
            const data = new EntityData({
                name: 'John',
                age: 30,
                active: true,
                createdAt: new Date('2025-01-01'),
            }, scheme);

            const updateData = {
                name: 123,
                age: 'thirty',
            } as any;

            expect(() => data.update(updateData)).toThrow(EntityDataUpdateException);

            try
            {
                data.update(updateData);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(2);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });
    });

    describe('complex data with mixed required/optional fields of all types', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string(),
            title: c.string().required(),
            age: c.number(),
            score: c.number().required(),
            active: c.boolean(),
            verified: c.boolean().required(),
            createdAt: c.datetime(),
            updatedAt: c.datetime().required(),
        }));

        it('should initialize with provided data', () =>
        {
            const data = new EntityData({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            }, scheme);

            expect(data.value.name).toBe('John');
            expect(data.value.title).toBe('Developer');
            expect(data.value.age).toBe(30);
            expect(data.value.score).toBe(95);
            expect(data.value.active).toBe(true);
            expect(data.value.verified).toBe(false);
            expect(data.value.createdAt).toEqual(new Date('2025-01-01'));
            expect(data.value.updatedAt).toEqual(new Date('2025-01-02'));
        });

        it('should update with valid values for all fields', () =>
        {
            const data = new EntityData({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            }, scheme);

            data.update({
                name: 'Jane',
                title: 'Senior Developer',
                age: 25,
                score: 99,
                active: false,
                verified: true,
                createdAt: new Date('2025-06-01'),
                updatedAt: new Date('2025-06-02'),
            });

            expect(data.value.name).toBe('Jane');
            expect(data.value.title).toBe('Senior Developer');
            expect(data.value.age).toBe(25);
            expect(data.value.score).toBe(99);
            expect(data.value.active).toBe(false);
            expect(data.value.verified).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-06-01'));
            expect(data.value.updatedAt).toEqual(new Date('2025-06-02'));
        });

        it('should throw EntityDataUpdateException on invalid update with mixed types', () =>
        {
            const data = new EntityData({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            }, scheme);

            const updateData = {
                name: 123,
                title: 456,
                age: 'thirty',
                score: 'ninety-five',
                active: 'yes',
                verified: 'maybe',
                createdAt: '2025-01-01',
                updatedAt: '2025-01-02',
            } as any;

            expect(() => data.update(updateData)).toThrow(EntityDataUpdateException);

            try
            {
                data.update(updateData);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
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

        it('should throw EntityDataUpdateException on undefined update', () =>
        {
            const data = new EntityData({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            }, scheme);

            expect(() => data.update({
                name: undefined,
                title: undefined,
                age: undefined,
                score: undefined,
                active: undefined,
                verified: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            })).toThrow(EntityDataUpdateException);

            try
            {
                data.update({
                    name: undefined,
                    title: undefined,
                    age: undefined,
                    score: undefined,
                    active: undefined,
                    verified: undefined,
                    createdAt: undefined,
                    updatedAt: undefined,
                });
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(4);
                expect(errors.title?.[0]?.messageKey).toBe('entity.field.required');
                expect(errors.score?.[0]?.messageKey).toBe('entity.field.required');
                expect(errors.verified?.[0]?.messageKey).toBe('entity.field.required');
                expect(errors.updatedAt?.[0]?.messageKey).toBe('entity.field.required');
            }
        });

        it('should update with partial valid data', () =>
        {
            const data = new EntityData({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            }, scheme);

            data.update({
                name: 'Jane',
                age: 25,
                verified: true,
            });

            expect(data.value.name).toBe('Jane');
            expect(data.value.title).toBe('Developer');
            expect(data.value.age).toBe(25);
            expect(data.value.score).toBe(95);
            expect(data.value.active).toBe(true);
            expect(data.value.verified).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-01-01'));
            expect(data.value.updatedAt).toEqual(new Date('2025-01-02'));
        });

        it('should throw EntityDataUpdateException on partial invalid data', () =>
        {
            const data = new EntityData({
                name: 'John',
                title: 'Developer',
                age: 30,
                score: 95,
                active: true,
                verified: false,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date('2025-01-02'),
            }, scheme);

            const updateData = {
                name: 123,
                age: 'thirty',
                verified: 'maybe',
            } as any;

            expect(() => data.update(updateData)).toThrow(EntityDataUpdateException);

            try
            {
                data.update(updateData);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(3);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.age?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.verified?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });
    });

    describe('data with defaulted fields', () =>
    {
        const scheme = EntityScheme.create((c) => ({
            name: c.string().withDefault('Unknown'),
            score: c.number().withDefault(0),
            active: c.boolean().withDefault(true),
            createdAt: c.datetime().withDefault(new Date('2025-01-01')),
        }));

        it('should initialize with provided data', () =>
        {
            const data = new EntityData({
                name: 'John',
                score: 100,
                active: false,
                createdAt: new Date('2025-06-01'),
            }, scheme);

            expect(data.value.name).toBe('John');
            expect(data.value.score).toBe(100);
            expect(data.value.active).toBe(false);
            expect(data.value.createdAt).toEqual(new Date('2025-06-01'));
        });

        it('should reset to default value when undefined is passed', () =>
        {
            const data = new EntityData({
                name: 'John',
                score: 100,
                active: false,
                createdAt: new Date('2025-06-01'),
            }, scheme);

            data.update({
                name: undefined,
                score: undefined,
                active: undefined,
                createdAt: undefined,
            });

            expect(data.value.name).toBe('Unknown');
            expect(data.value.score).toBe(0);
            expect(data.value.active).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-01-01'));
        });

        it('should update with valid values', () =>
        {
            const data = new EntityData({
                name: 'John',
                score: 100,
                active: false,
                createdAt: new Date('2025-06-01'),
            }, scheme);

            data.update({
                name: 'Jane',
                score: 50,
                active: true,
                createdAt: new Date('2025-12-01'),
            });

            expect(data.value.name).toBe('Jane');
            expect(data.value.score).toBe(50);
            expect(data.value.active).toBe(true);
            expect(data.value.createdAt).toEqual(new Date('2025-12-01'));
        });

        it('should reset to default value with partial update', () =>
        {
            const data = new EntityData({
                name: 'John',
                score: 100,
                active: false,
                createdAt: new Date('2025-06-01'),
            }, scheme);

            data.update({
                name: 'Updated',
                score: undefined,
            });

            expect(data.value.name).toBe('Updated');
            expect(data.value.score).toBe(0);
            expect(data.value.active).toBe(false);
            expect(data.value.createdAt).toEqual(new Date('2025-06-01'));
        });

        it('should throw EntityDataUpdateException on invalid type', () =>
        {
            const data = new EntityData({
                name: 'John',
                score: 100,
                active: false,
                createdAt: new Date('2025-06-01'),
            }, scheme);

            const updateData = {
                name: 123,
                score: 'not-a-number',
                active: 'yes',
                createdAt: '2025-01-01',
            } as any;

            expect(() => data.update(updateData)).toThrow(EntityDataUpdateException);

            try
            {
                data.update(updateData);
            }
            catch (error)
            {
                expect(error).toBeInstanceOf(EntityDataUpdateException);
                const errors = (error as EntityDataUpdateException).errors;
                expect(Object.keys(errors)).toHaveLength(4);
                expect(errors.name?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.score?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.active?.[0]?.messageKey).toBe('entity.field.invalid');
                expect(errors.createdAt?.[0]?.messageKey).toBe('entity.field.invalid');
            }
        });

        it('should ignore unknown fields during update', () =>
        {
            const data = new EntityData({
                name: 'John',
                score: 100,
                active: false,
                createdAt: new Date('2025-06-01'),
            }, scheme);

            const updateData = {
                unknownField: 'test',
                anotherUnknown: 123,
            } as any;

            expect(() => data.update(updateData)).not.toThrow();
            data.update(updateData);

            expect(data.value.name).toBe('John');
            expect(data.value.score).toBe(100);
            expect(data.value.active).toBe(false);
            expect(data.value.createdAt).toEqual(new Date('2025-06-01'));
        });
    });
});
