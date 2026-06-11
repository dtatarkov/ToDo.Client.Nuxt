import { describe, it, expect, vi } from 'vitest';
import { DisposeToken } from '../../entities/disposeToken';
import { DisposedException } from '../../exceptions/disposedException';

describe('DisposeToken', () =>
{
    describe('isDisposed', () =>
    {
        it('should be false initially', () =>
        {
            const token = new DisposeToken();
            expect(token.isDisposed).toBe(false);
        });

        it('should be true after dispose', () =>
        {
            const token = new DisposeToken();
            token[Symbol.dispose]();
            expect(token.isDisposed).toBe(true);
        });

        it('should remain true after multiple dispose calls', () =>
        {
            const token = new DisposeToken();
            token[Symbol.dispose]();
            token[Symbol.dispose](); // Second call should have no effect
            expect(token.isDisposed).toBe(true);
        });
    });

    describe('assertNotDisposed', () =>
    {
        it('should not throw when not disposed', () =>
        {
            const token = new DisposeToken();
            expect(() => token.assertNotDisposed()).not.toThrow();
        });

        it('should throw DisposedException when disposed', () =>
        {
            const token = new DisposeToken();
            token[Symbol.dispose]();
            expect(() => token.assertNotDisposed()).toThrow(DisposedException);
        });
    });

    describe('onDispose', () =>
    {
        it('should register and execute dispose handlers', () =>
        {
            const token = new DisposeToken();
            const handler = vi.fn();

            token.onDispose(handler);
            token[Symbol.dispose]();

            expect(handler).toHaveBeenCalledOnce();
        });

        it('should execute all registered handlers', () =>
        {
            const token = new DisposeToken();
            const handler1 = vi.fn();
            const handler2 = vi.fn();

            token.onDispose(handler1);
            token.onDispose(handler2);
            token[Symbol.dispose]();

            expect(handler1).toHaveBeenCalledOnce();
            expect(handler2).toHaveBeenCalledOnce();
        });

        it('should throw DisposedException when registering after dispose', () =>
        {
            const token = new DisposeToken();
            token[Symbol.dispose]();

            expect(() => token.onDispose(() => { })).toThrow(DisposedException);
        });

        it('should not execute handlers twice', () =>
        {
            const token = new DisposeToken();
            const handler = vi.fn();

            token.onDispose(handler);
            token[Symbol.dispose]();
            token[Symbol.dispose](); // second call is no-op

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    describe('[Symbol.dispose]', () =>
    {
        it('should mark token as disposed', () =>
        {
            const token = new DisposeToken();
            expect(token.isDisposed).toBe(false);
            token[Symbol.dispose]();
            expect(token.isDisposed).toBe(true);
        });
    });
});