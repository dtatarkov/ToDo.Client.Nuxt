import { describe, it, expect } from 'vitest';
import { isDate } from '../../utils/isDate';

describe('isDate', () =>
{
    it('should correctly identify Date objects', () =>
    {
        const date = new Date();
        const result = isDate(date);
        expect(result).toBe(true);
    });

    it('should return false for non-Date objects', () =>
    {
        expect(isDate('not a date')).toBe(false);
        expect(isDate(123)).toBe(false);
        expect(isDate(null)).toBe(false);
        expect(isDate(undefined)).toBe(false);
        expect(isDate({})).toBe(false);
    });
});