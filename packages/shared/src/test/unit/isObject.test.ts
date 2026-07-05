import { describe, it, expect } from 'vitest';
import { isObject } from '../../utils/isObject';

describe('isObject', () =>
{
    it('should return true for plain objects', () =>
    {
        expect(isObject({})).toBe(true);
        expect(isObject({ a: 1 })).toBe(true);
        expect(isObject({ a: 1, b: 'test' })).toBe(true);
    });

    it('should return false for arrays', () =>
    {
        expect(isObject([])).toBe(false);
        expect(isObject([1, 2, 3])).toBe(false);
        expect(isObject([{ a: 1 }])).toBe(false);
    });

    it('should return false for null', () =>
    {
        expect(isObject(null)).toBe(false);
    });

    it('should return false for undefined', () =>
    {
        expect(isObject(undefined)).toBe(false);
    });

    it('should return false for primitive values', () =>
    {
        expect(isObject(42)).toBe(false);
        expect(isObject('string')).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(Symbol('test'))).toBe(false);
        expect(isObject(BigInt(123))).toBe(false);
    });

    it('should return false for functions', () =>
    {
        expect(isObject(() => { })).toBe(false);
        expect(isObject(function () { })).toBe(false);
    });

    it('should return false for class instances', () =>
    {
        class TestClass { }
        expect(isObject(new TestClass())).toBe(false);

        const date = new Date();
        expect(isObject(date)).toBe(false);

        const regex = /test/;
        expect(isObject(regex)).toBe(false);
    });
});