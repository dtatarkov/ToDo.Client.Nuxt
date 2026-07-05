import { describe, it, expect, vi } from 'vitest';
import { once } from '../../utils/once';

describe('once', () =>
{
    it('should call the original function only once', () =>
    {
        const mockFn = vi.fn();
        const wrapped = once(mockFn);

        wrapped();
        wrapped();
        wrapped();

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should not call the function if never invoked', () =>
    {
        const mockFn = vi.fn();
        once(mockFn);

        expect(mockFn).not.toHaveBeenCalled();
    });
});