import { describe, it, expect } from 'vitest';
import { DestroyToken } from '../../entities/destroyToken';
import { DestroyedException } from '../../exceptions/destroyedException';

describe('DestroyToken', () =>
{
    describe('isDestroyed', () =>
    {
        it('should be false initially', () =>
        {
            const token = new DestroyToken();
            expect(token.isDestroyed).toBe(false);
        });

        it('should be true after destroy', () =>
        {
            const token = new DestroyToken();
            token.destroy();
            expect(token.isDestroyed).toBe(true);
        });

        it('should remain true after multiple destroy calls', () =>
        {
            const token = new DestroyToken();
            token.destroy();
            token.destroy(); // Second call should have no effect
            expect(token.isDestroyed).toBe(true);
        });
    });

    describe('assertNotDestroyed', () =>
    {
        it('should not throw when not destroyed', () =>
        {
            const token = new DestroyToken();
            expect(() => token.assertNotDestroyed()).not.toThrow();
        });

        it('should throw DestroyedException when destroyed', () =>
        {
            const token = new DestroyToken();
            token.destroy();
            expect(() => token.assertNotDestroyed()).toThrow(DestroyedException);
        });
    });

    describe('destroy', () =>
    {
        it('should mark token as destroyed', () =>
        {
            const token = new DestroyToken();
            expect(token.isDestroyed).toBe(false);
            token.destroy();
            expect(token.isDestroyed).toBe(true);
        });
    });
});