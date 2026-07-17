import { describe, it, expect } from 'vitest';
import { setTime } from '../../src/utils/setTime';

describe('setTime', () =>
{
    const baseDate = new Date(2023, 0, 1, 12, 0, 0, 0); // 1 января 2023, 12:00:00

    it('should set time correctly for valid milliseconds', () =>
    {
        const result = setTime(baseDate, 1000); // 1 секунда

        expect(result.getHours()).toBe(0);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(1);
        expect(result.getMilliseconds()).toBe(0);
    });

    it('should set time correctly for 24 hours', () =>
    {
        const maxMilliseconds = 24 * 60 * 60 * 1000; // 24 часа
        const result = setTime(baseDate, maxMilliseconds);

        expect(result.getFullYear()).toBe(2023);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(2);
        expect(result.getHours()).toBe(0);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
        expect(result.getMilliseconds()).toBe(0);
    });

    it('should throw error for negative milliseconds', () =>
    {
        expect(() => setTime(baseDate, -1000)).toThrow('Milliseconds cannot be negative');
    });

    it('should throw error for milliseconds exceeding 24 hours', () =>
    {
        const maxMilliseconds = 24 * 60 * 60 * 1000;
        expect(() => setTime(baseDate, maxMilliseconds + 1)).toThrow('Milliseconds cannot exceed 24 hours');
    });

    it('should preserve date part when setting time', () =>
    {
        const result = setTime(baseDate, 1000); // 1 секунда

        expect(result.getFullYear()).toBe(2023);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(1);
    });
});