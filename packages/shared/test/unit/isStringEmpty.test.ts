import { describe, expect, it } from "vitest";
import { isStringEmpty } from "../../src/utils/isStringEmpty";

describe('isStringEmpty', () =>
{
    it('should return true for empty string', () =>
    {
        expect(isStringEmpty('')).toBe(true);
    });

    it('should return true for string with only whitespace', () =>
    {
        expect(isStringEmpty('   ')).toBe(true);
        expect(isStringEmpty('\t\n')).toBe(true);
    });

    it('should return false for non-empty string', () =>
    {
        expect(isStringEmpty('hello')).toBe(false);
        expect(isStringEmpty(' hello ')).toBe(false);
    });

    it('should return true for null', () =>
    {
        expect(isStringEmpty(null)).toBe(true);
    });

    it('should return true for undefined', () =>
    {
        expect(isStringEmpty(undefined)).toBe(true);
    });
});