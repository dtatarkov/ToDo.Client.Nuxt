import { describe, it, expect, vi } from 'vitest';
import { AsyncCommandBase } from '../../entities/asyncCommandBase';
import { CommandState } from '../../enums/commandState';

describe('AsyncCommandBase', () =>
{
    it('should execute and call result callback with resolved value', async () =>
    {
        const command = new AsyncCommandBase(() => Promise.resolve(42));
        const resultFn = vi.fn();

        command.on({ result: resultFn });

        const result = await command.executeAsync();

        expect(result).toBe(42);
        expect(resultFn).toHaveBeenCalledWith(42);
    });

    it('should call stateChange with busy then readyToStart', async () =>
    {
        const command = new AsyncCommandBase(() => Promise.resolve('done'));
        const stateChangeFn = vi.fn();

        command.on({ stateChange: stateChangeFn });

        await command.executeAsync();

        expect(stateChangeFn).toHaveBeenCalledTimes(2);
        expect(stateChangeFn).toHaveBeenNthCalledWith(1, CommandState.busy);
        expect(stateChangeFn).toHaveBeenNthCalledWith(2, CommandState.readyToStart);
    });

    it('should throw if on is called twice', () =>
    {
        const command = new AsyncCommandBase(() => Promise.resolve(0));

        command.on({ result: vi.fn() });

        expect(() => command.on({ result: vi.fn() })).toThrow('Callbacks already set');
    });

    it('should propagate rejection from executeInternal', async () =>
    {
        const error = new Error('test error');
        const command = new AsyncCommandBase(() => Promise.reject(error));

        await expect(command.executeAsync()).rejects.toThrow('test error');
    });

    it('should not call result callback on rejection', async () =>
    {
        const error = new Error('fail');
        const command = new AsyncCommandBase(() => Promise.reject(error));
        const resultFn = vi.fn();

        command.on({ result: resultFn });

        await expect(command.executeAsync()).rejects.toThrow('fail');

        expect(resultFn).not.toHaveBeenCalled();
    });
});