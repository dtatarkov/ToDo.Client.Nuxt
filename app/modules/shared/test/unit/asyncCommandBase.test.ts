import { describe, it, expect, vi } from 'vitest';
import { AsyncCommandBase } from '../../entities/asyncCommandBase';
import { DisposeToken } from '../../entities/disposeToken';

describe('AsyncCommandBase', () =>
{
    it('should execute and call onExecuted with resolved true', async () =>
    {
        const command = new AsyncCommandBase(async () => true);
        const executedFn = vi.fn();
        const disposeToken = new DisposeToken();

        command.onExecuted(executedFn, disposeToken);

        const result = await command.executeAsync();

        expect(result).toBe(true);
        expect(executedFn).toHaveBeenCalledOnce();
    });

    it('should call onExecuting then onIdle during execution', async () =>
    {
        const command = new AsyncCommandBase(async () => true);
        const executingFn = vi.fn();
        const idleFn = vi.fn();
        const disposeToken = new DisposeToken();

        command.onExecuting(executingFn, disposeToken);
        command.onIdle(idleFn, disposeToken);

        await command.executeAsync();

        expect(executingFn).toHaveBeenCalledOnce();
        expect(idleFn).toHaveBeenCalledOnce();
        expect(executingFn.mock.invocationCallOrder[0]).toBeLessThan(idleFn.mock.invocationCallOrder[0] as number);
    });

    it('should not call onExecuted when result is false', async () =>
    {
        const command = new AsyncCommandBase(() => Promise.resolve(false));
        const executedFn = vi.fn();
        const disposeToken = new DisposeToken();

        command.onExecuted(executedFn, disposeToken);

        const result = await command.executeAsync();

        expect(result).toBe(false);
        expect(executedFn).not.toHaveBeenCalled();
    });

    it('should propagate rejection from executeInternal', async () =>
    {
        const error = new Error('test error');
        const command = new AsyncCommandBase(() => Promise.reject(error));

        await expect(command.executeAsync()).rejects.toThrow('test error');
    });

    it('should call onIdle even on rejection', async () =>
    {
        const error = new Error('fail');
        const command = new AsyncCommandBase(() => Promise.reject(error));
        const idleFn = vi.fn();
        const disposeToken = new DisposeToken();

        command.onIdle(idleFn, disposeToken);

        await expect(command.executeAsync()).rejects.toThrow('fail');

        expect(idleFn).toHaveBeenCalledOnce();
    });

    it('should not call onExecuted on rejection', async () =>
    {
        const error = new Error('fail');
        const command = new AsyncCommandBase(() => Promise.reject(error));
        const executedFn = vi.fn();
        const disposeToken = new DisposeToken();

        command.onExecuted(executedFn, disposeToken);

        await expect(command.executeAsync()).rejects.toThrow('fail');

        expect(executedFn).not.toHaveBeenCalled();
    });
});