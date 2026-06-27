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

    describe('createChildToken', () =>
    {
        it('should create a child token that is not disposed initially', () =>
        {
            const parent = new DisposeToken();
            const child = parent.createChildToken();

            expect(child.isDisposed).toBe(false);
        });

        it('should dispose child token when parent is disposed', () =>
        {
            const parent = new DisposeToken();
            const child = parent.createChildToken();

            parent[Symbol.dispose]();

            expect(child.isDisposed).toBe(true);
        });

        it('should not dispose parent when child is disposed', () =>
        {
            const parent = new DisposeToken();
            const child = parent.createChildToken();

            child[Symbol.dispose]();

            expect(parent.isDisposed).toBe(false);
        });

        it('should execute child dispose handlers when parent is disposed', () =>
        {
            const parent = new DisposeToken();
            const child = parent.createChildToken();
            const childHandler = vi.fn();

            child.onDispose(childHandler);
            parent[Symbol.dispose]();

            expect(childHandler).toHaveBeenCalledOnce();
        });

        it('should create independent child tokens', () =>
        {
            const parent = new DisposeToken();
            const child1 = parent.createChildToken();
            const child2 = parent.createChildToken();

            child1[Symbol.dispose]();

            expect(child1.isDisposed).toBe(true);
            expect(child2.isDisposed).toBe(false);
            expect(parent.isDisposed).toBe(false);
        });
    });

    describe('reset', () =>
    {
        it('should set isDisposed to false after reset', () =>
        {
            const token = new DisposeToken();
            token[Symbol.dispose]();
            expect(token.isDisposed).toBe(true);

            token.reset();
            expect(token.isDisposed).toBe(false);
        });

        it('should allow registering new handlers after reset', () =>
        {
            const token = new DisposeToken();
            token[Symbol.dispose]();

            token.reset();
            const handler = vi.fn();
            token.onDispose(handler);
            token[Symbol.dispose]();

            expect(handler).toHaveBeenCalledOnce();
        });
    });
});