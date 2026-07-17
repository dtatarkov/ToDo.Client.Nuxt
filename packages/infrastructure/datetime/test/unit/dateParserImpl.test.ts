import { describe, it, expect } from 'vitest';
import { DateParserImpl } from '../../src/services/dateParserImpl';

describe('DateParserImpl', () =>
{
    const parser = new DateParserImpl();

    describe('fromString', () =>
    {
        it('should convert ASP.NET Core date string to Date object', () =>
        {
            const dateString = '2023-10-15T10:00:00';
            const expectedDate = new Date(2023, 9, 15, 10, 0, 0);

            const result = parser.fromString(dateString);

            expect(result).toEqual(expectedDate);
        });

        it('should handle null input', () =>
        {
            expect(() => parser.fromString(null as any)).toThrow();
        });

        it('should handle undefined input', () =>
        {
            expect(() => parser.fromString(undefined as any)).toThrow();
        });

        it('should handle invalid date string', () =>
        {
            expect(() => parser.fromString('invalid-date')).toThrow();
        });

        it('should handle empty string', () =>
        {
            expect(() => parser.fromString('')).toThrow();
        });

        it('should convert ISO date string with milliseconds', () =>
        {
            const dateString = '2023-10-15T10:00:00.123';
            const expectedDate = new Date(2023, 9, 15, 10, 0, 0, 123);

            const result = parser.fromString(dateString);

            expect(result).toEqual(expectedDate);
        });
    });

    describe('fromStringOptional', () =>
    {
        it('should handle null input for fromStringOptional', () =>
        {
            const result = parser.fromStringOptional(null as any);
            expect(result).toBeUndefined();
        });

        it('should handle undefined input for fromStringOptional', () =>
        {
            const result = parser.fromStringOptional(undefined as any);
            expect(result).toBeUndefined();
        });

        it('should handle empty string for fromStringOptional', () =>
        {
            const result = parser.fromStringOptional('');
            expect(result).toBeUndefined();
        });

        it('should handle valid date string for fromStringOptional', () =>
        {
            const dateString = '2023-10-15T10:00:00';
            const expectedDate = new Date(2023, 9, 15, 10, 0, 0);

            const result = parser.fromStringOptional(dateString);

            expect(result).toEqual(expectedDate);
        });

        it('should handle invalid date string for fromStringOptional', () =>
        {
            expect(() => parser.fromStringOptional('invalid-date')).toThrow();
        });
    });
});
