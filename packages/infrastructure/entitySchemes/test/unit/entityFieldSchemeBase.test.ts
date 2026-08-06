import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EntityFieldSchemeBase } from '../../src/entities/entityFieldSchemeBase';
import { EntityFieldParseException } from '../../src/exceptions/entityFieldParseException';

describe('EntityFieldSchemeBase', () =>
{
    const mockSafeParse = vi.fn();
    const mockSchema = { safeParse: mockSafeParse };

    beforeEach(() =>
    {
        vi.clearAllMocks();
    });

    it('should return empty array when safeParse returns success', () =>
    {
        mockSafeParse.mockReturnValue({ success: true });

        const scheme = new EntityFieldSchemeBase<string>(mockSchema as any);
        const result = scheme.validate('');

        expect(result).toHaveLength(0);
    });

    it('should return validation errors from safeParse issues', () =>
    {
        mockSafeParse.mockReturnValue({
            success: false,
            error: {
                issues: [
                    { message: 'entity.field.invalid' },
                ],
            },
        });

        const scheme = new EntityFieldSchemeBase<string>(mockSchema as any);
        const result = scheme.validate('');

        expect(result).toHaveLength(1);
        expect(result[0]?.messageKey).toBe('entity.field.invalid');
    });

    it('should return parsed value when safeParse succeeds', () =>
    {
        mockSafeParse.mockReturnValue({ success: true, data: 'test' });

        const scheme = new EntityFieldSchemeBase<string>(mockSchema as any);
        const result = scheme.parse('test');

        expect(result).toBe('test');
    });

    it('should throw EntityFieldParseException when safeParse fails', () =>
    {
        mockSafeParse.mockReturnValue({
            success: false,
            error: {
                issues: [
                    { message: 'entity.field.invalid' },
                ],
            },
        });

        const scheme = new EntityFieldSchemeBase<string>(mockSchema as any);

        expect(() => scheme.parse('test')).toThrow(EntityFieldParseException);

        try
        {
            scheme.parse('test');
        }
        catch (error)
        {
            expect(error).toBeInstanceOf(EntityFieldParseException);

            const errors = (error as EntityFieldParseException).errors;

            expect(errors).toHaveLength(1);
            expect(errors[0]?.messageKey).toBe('entity.field.invalid');
        }
    });
});
