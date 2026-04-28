import { describe, it, expect } from 'vitest';
import { DatesServiceImpl } from '../../services/datesServiceImpl';
import type { AppPublicRuntimeConfig } from '../../interfaces/appPublicRuntimeConfig';

describe('DatesServiceImpl', () =>
{
  const config: AppPublicRuntimeConfig = {
    apiBaseUrl: '',
    locale: 'ru',
    longTaskSpinnerDelay: 500
  };

  const service = new DatesServiceImpl(config);

  describe('fromString', () =>
  {

    it('should convert ASP.NET Core date string to Date object', () =>
    {
      const dateString = '2023-10-15T10:00:00';
      const expectedDate = new Date(2023, 9, 15, 10, 0, 0);

      const result = service.fromString(dateString);

      expect(result).toEqual(expectedDate);
    });

    it('should handle null input', () =>
    {
      expect(() => service.fromString(null as any)).toThrow();
    });

    it('should handle undefined input', () =>
    {
      expect(() => service.fromString(undefined as any)).toThrow();
    });

    it('should handle invalid date string', () =>
    {
      expect(() => service.fromString('invalid-date')).toThrow();
    });

    it('should handle empty string', () =>
    {
      expect(() => service.fromString('')).toThrow();
    });

    it('should convert ISO date string with milliseconds', () =>
    {
      const dateString = '2023-10-15T10:00:00.123';
      const expectedDate = new Date(2023, 9, 15, 10, 0, 0, 123);

      const result = service.fromString(dateString);

      expect(result).toEqual(expectedDate);
    });
  });

  describe('fromStringOptional', () =>
  {
    it('should handle null input for fromStringOptional', () =>
    {
      const result = service.fromStringOptional(null as any);
      expect(result).toBeUndefined();
    });

    it('should handle undefined input for fromStringOptional', () =>
    {
      const result = service.fromStringOptional(undefined as any);
      expect(result).toBeUndefined();
    });

    it('should handle empty string for fromStringOptional', () =>
    {
      const result = service.fromStringOptional('');
      expect(result).toBeUndefined();
    });

    it('should handle valid date string for fromStringOptional', () =>
    {
      const dateString = '2023-10-15T10:00:00';
      const expectedDate = new Date(2023, 9, 15, 10, 0, 0);

      const result = service.fromStringOptional(dateString);

      expect(result).toEqual(expectedDate);
    });

    it('should handle invalid date string for fromStringOptional', () =>
    {
      expect(() => service.fromStringOptional('invalid-date')).toThrow();
    });
  });

  describe('isDate', () =>
  {
    it('should correctly identify Date objects', () =>
    {
      const date = new Date();
      const result = service.isDate(date);
      expect(result).toBe(true);
    });

    it('should return false for non-Date objects', () =>
    {
      expect(service.isDate('not a date')).toBe(false);
      expect(service.isDate(123)).toBe(false);
      expect(service.isDate(null)).toBe(false);
      expect(service.isDate(undefined)).toBe(false);
      expect(service.isDate({})).toBe(false);
    });
  });

  describe('formatDate', () =>
  {
    it('should format date with default options', () =>
    {
      const date = new Date(2023, 9, 15, 10, 30, 45);
      const result = service.formatDate(date);

      expect(result).toBe('15.10.2023, 10:30'); // Russian locale formatting
    });

    it('should throw error for invalid date formatting', () =>
    {
      const date = new Date('invalid-date');

      expect(() => service.formatDate(date)).toThrow();
    });
  });

  describe('formatDateOptional', () =>
  {
    it('should return empty string for undefined date in formatDateOptional', () =>
    {
      const result = service.formatDateOptional(undefined);

      expect(result).toBe('');
    });

    it('should return formatted date for valid date in formatDateOptional', () =>
    {
      const date = new Date(2023, 9, 23, 10, 42, 45);
      const result = service.formatDateOptional(date);

      expect(result).toBe('23.10.2023, 10:42');
    });
  });

  describe('setTime', () =>
  {
    const baseDate = new Date(2023, 0, 1, 12, 0, 0, 0); // 1 января 2023, 12:00:00

    it('should set time correctly for valid milliseconds', () =>
    {
      const result = service.setTime(baseDate, 1000); // 1 секунда

      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(1);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('should set time correctly for 24 hours', () =>
    {
      const maxMilliseconds = 24 * 60 * 60 * 1000; // 24 часа
      const result = service.setTime(baseDate, maxMilliseconds);

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
      expect(() => service.setTime(baseDate, -1000)).toThrow('Milliseconds cannot be negative');
    });

    it('should throw error for milliseconds exceeding 24 hours', () =>
    {
      const maxMilliseconds = 24 * 60 * 60 * 1000;
      expect(() => service.setTime(baseDate, maxMilliseconds + 1)).toThrow('Milliseconds cannot exceed 24 hours');
    });

    it('should preserve date part when setting time', () =>
    {
      const result = service.setTime(baseDate, 1000); // 1 секунда

      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe('getTime', () =>
  {
    it('should return 0 for midnight', () =>
    {
      const date = new Date(2023, 0, 1, 0, 0, 0, 0);
      const result = service.getTime(date);

      expect(result).toBe(0);
    });

    it('should return correct milliseconds for 12:30:45', () =>
    {
      const date = new Date(2023, 0, 1, 12, 30, 45, 0);
      const expected = 12 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000;
      const result = service.getTime(date);

      expect(result).toBe(expected);
    });

    it('should return correct milliseconds for 23:59:59', () =>
    {
      const date = new Date(2023, 0, 1, 23, 59, 59, 0);
      const expected = 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000;
      const result = service.getTime(date);

      expect(result).toBe(expected);
    });
  });
});