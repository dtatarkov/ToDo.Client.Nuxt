import { describe, expect, it } from "vitest";
import { postfixNotEmptyString } from "../../utils/postfixNotEmptyString";

describe('postfixNotEmptyString', () =>
{
    it('should add postfix to non-empty string with default separator', () =>
    {
        expect(postfixNotEmptyString('hello', 'post')).toBe('hello-post');
    });

    it('should add postfix to non-empty string with custom separator', () =>
    {
        expect(postfixNotEmptyString('hello', 'post', '_')).toBe('hello_post');
    });

    it('should return empty string when input is empty', () =>
    {
        expect(postfixNotEmptyString('', 'post')).toBe('');
    });
});