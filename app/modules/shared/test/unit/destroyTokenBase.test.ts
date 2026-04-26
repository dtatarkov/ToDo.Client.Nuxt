import { describe, it, expect } from 'vitest';
import { DestroyTokenBase } from '../../entities/destroyTokenBase';
import { DestroyedException } from '../../exceptions/destroyedException';

describe('DestroyTokenBase', () =>
{
    describe('isDestroyed', () =>
    {
        it('should be false initially', () =>
        {
            const token = new DestroyTokenBase();
            expect(token.isDestroyed).toBe(false);
        });

        it('should be true after destroy', () =>
        {
            const token = new DestroyTokenBase();
            token.destroy();
            expect(token.isDestroyed).toBe(true);
        });

        it('should remain true after multiple destroy calls', () =>
        {
            const token = new DestroyTokenBase();
            token.destroy();
            token.destroy(); // Second call should have no effect
            expect(token.isDestroyed).toBe(true);
        });
    });

    describe('assertNotDestroyed', () =>
    {
        it('should not throw when not destroyed', () =>
        {
            const token = new DestroyTokenBase();
            expect(() => token.assertNotDestroyed()).not.toThrow();
        });

        it('should throw DestroyedException when destroyed', () =>
        {
            const token = new DestroyTokenBase();
            token.destroy();
            expect(() => token.assertNotDestroyed()).toThrow(DestroyedException);
        });
    });

    describe('destroy', () =>
    {
        it('should mark token as destroyed', () =>
        {
            const token = new DestroyTokenBase();
            expect(token.isDestroyed).toBe(false);
            token.destroy();
            expect(token.isDestroyed).toBe(true);
        });
    });
});