import { describe, it, expect } from 'vitest';
import { AsyncCommandGeneric } from '../../src/entities/asyncCommandGeneric';
import { DisposedException } from '../../src/exceptions/disposedException';
import { delay } from '../../src/utils/delay';

describe('AsyncCommandGeneric', () =>
{
    describe('executeAsync', () =>
    {
        it('should return true, fire onExecuting → onExecuted → onIdle when resolved true', async () =>
        {
            const command = new AsyncCommandGeneric(async () => true);
            const logs: string[] = [];

            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            const result = await command.executeAsync();

            expect(result).toBe(true);
            expect(logs).toEqual(['executing', 'executed', 'idle']);
        });

        it('should return true, fire onExecuting → onExecuted → onIdle when resolved undefined', async () =>
        {
            const command = new AsyncCommandGeneric(async () => undefined);
            const logs: string[] = [];

            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            const result = await command.executeAsync();

            expect(result).toBe(true);
            expect(logs).toEqual(['executing', 'executed', 'idle']);
        });

        it('should return true, fire onExecuting → onExecuted → onIdle when resolved void', async () =>
        {
            const command = new AsyncCommandGeneric(async () => { /* no return */ });
            const logs: string[] = [];

            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            const result = await command.executeAsync();

            expect(result).toBe(true);
            expect(logs).toEqual(['executing', 'executed', 'idle']);
        });

        it('should return false, fire onExecuting → onIdle (no onExecuted) when resolved false', async () =>
        {
            const command = new AsyncCommandGeneric(async () => false);
            const logs: string[] = [];

            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(logs).toEqual(['executing', 'idle']);
        });

        it('should reject, fire onIdle only (no onExecuted) when throws', async () =>
        {
            const error = new Error('boom');
            const command = new AsyncCommandGeneric(() => Promise.reject(error));
            const logs: string[] = [];

            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            await expect(command.executeAsync()).rejects.toThrow('boom');
            expect(logs).toEqual(['executing', 'idle']);
        });

        it('should return false and skip execution when already executing', async () =>
        {
            const command = new AsyncCommandGeneric(() => delay(10000));
            command.executeAsync();

            const result = await command.executeAsync();

            expect(result).toBe(false);
        });

        it('should throw DisposedException when executed after dispose', async () =>
        {
            const command = new AsyncCommandGeneric(async () => true);

            command[Symbol.dispose]();

            await expect(command.executeAsync()).rejects.toThrow(DisposedException);
        });
    });

    describe('dispose', () =>
    {
        it('should not throw when disposed multiple times', () =>
        {
            const command = new AsyncCommandGeneric(async () => true);

            command[Symbol.dispose]();
            expect(() => command[Symbol.dispose]()).not.toThrow();
        });
    });
});
