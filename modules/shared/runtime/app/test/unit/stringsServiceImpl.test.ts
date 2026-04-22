import { describe, expect, it } from "vitest";
import { StringsServiceImpl } from "../../services/stringsServiceImpl";

describe('StringsServiceImpl', () =>
{
  const service = new StringsServiceImpl();

  describe('isStringEmpty', () =>
  {
    it('should return true for empty string', () =>
    {
      expect(service.isStringEmpty('')).toBe(true);
    });

    it('should return true for string with only whitespace', () =>
    {
      expect(service.isStringEmpty('   ')).toBe(true);
      expect(service.isStringEmpty('\t\n')).toBe(true);
    });

    it('should return false for non-empty string', () =>
    {
      expect(service.isStringEmpty('hello')).toBe(false);
      expect(service.isStringEmpty(' hello ')).toBe(false);
    });

    it('should return true for null', () =>
    {
      expect(service.isStringEmpty(null)).toBe(true);
    });

    it('should return true for undefined', () =>
    {
      expect(service.isStringEmpty(undefined)).toBe(true);
    });
  });

  describe('postfixNotEmpty', () =>
  {
    it('should add postfix to non-empty string with default separator', () =>
    {
      expect(service.postfixNotEmpty('hello', 'post')).toBe('hello-post');
    });

    it('should add postfix to non-empty string with custom separator', () =>
    {
      expect(service.postfixNotEmpty('hello', 'post', '_')).toBe('hello_post');
    });

    it('should return empty string when input is empty', () =>
    {
      expect(service.postfixNotEmpty('', 'post')).toBe('');
    });
  });
});