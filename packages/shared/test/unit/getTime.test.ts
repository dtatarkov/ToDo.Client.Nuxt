import { describe, it, expect } from 'vitest';
import { getTime } from '../../src/utils/getTime';

describe('getTime', () =>
{
    it('should return 0 for midnight', () =>
    {
        const date = new Date(2023, 0, 1, 0, 0, 0, 0);
        const result = getTime(date);

        expect(result).toBe(0);
    });

    it('should return correct milliseconds for 12:30:45', () =>
    {
        const date = new Date(2023, 0, 1, 12, 30, 45, 0);
        const expected = 12 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000;
        const result = getTime(date);

        expect(result).toBe(expected);
    });

    it('should return correct milliseconds for 23:59:59', () =>
    {
        const date = new Date(2023, 0, 1, 23, 59, 59, 0);
        const expected = 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000;
        const result = getTime(date);

        expect(result).toBe(expected);
    });
});