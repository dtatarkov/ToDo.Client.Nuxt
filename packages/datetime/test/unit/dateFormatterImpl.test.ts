import { describe, it, expect } from 'vitest';
import { DateFormatterImpl } from '../../src/services/dateFormatterImpl';
import type { DateFormatterConfiguration } from '../../src/services/dateFormatter';

describe('DateFormatterImpl', () =>
{
    const config: DateFormatterConfiguration = {
        locale: 'ru'
    };

    const formatter = new DateFormatterImpl(config);

    describe('formatDate', () =>
    {
        it('should format date with default options', () =>
        {
            const date = new Date(2023, 9, 15, 10, 30, 45);
            const result = formatter.formatDate(date);

            expect(result).toBe('15.10.2023, 10:30'); // Russian locale formatting
        });

        it('should throw error for invalid date formatting', () =>
        {
            const date = new Date('invalid-date');

            expect(() => formatter.formatDate(date)).toThrow();
        });
    });

    describe('formatDateOptional', () =>
    {
        it('should return empty string for undefined date in formatDateOptional', () =>
        {
            const result = formatter.formatDateOptional(undefined);

            expect(result).toBe('');
        });

        it('should return formatted date for valid date in formatDateOptional', () =>
        {
            const date = new Date(2023, 9, 23, 10, 42, 45);
            const result = formatter.formatDateOptional(date);

            expect(result).toBe('23.10.2023, 10:42');
        });
    });
});
