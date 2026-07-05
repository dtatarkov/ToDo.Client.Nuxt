import { describe, it, expect, vi } from 'vitest';
import { EntityEvent } from '../../entities/entityEvent';
import { DisposeToken } from '../../entities/disposeToken';
import { awaitMicrotasks } from '../../utils/awaitMicrotasks';

describe('EntityEvent', () =>
{
    describe('default (immediate, always emit)', () =>
    {
        it('should call handler on emit', () =>
        {
            const event = new EntityEvent();
            const handler = vi.fn();

            event.on(handler);
            event.emit();

            expect(handler).toHaveBeenCalledOnce();
        });

        it('should pass value to handler on emit', () =>
        {
            const event = new EntityEvent<string>();
            const handler = vi.fn();

            event.on(handler);
            event.emit('test');

            expect(handler).toHaveBeenCalledWith('test');
        });

        it('should call multiple handlers on emit', () =>
        {
            const event = new EntityEvent();
            const handler1 = vi.fn();
            const handler2 = vi.fn();

            event.on(handler1);
            event.on(handler2);
            event.emit();

            expect(handler1).toHaveBeenCalledOnce();
            expect(handler2).toHaveBeenCalledOnce();
        });

        it('should not call handler after dispose token is disposed', () =>
        {
            const event = new EntityEvent();
            const handler = vi.fn();
            const disposeToken = new DisposeToken();

            event.on(handler, disposeToken);
            disposeToken[Symbol.dispose]();
            event.emit();

            expect(handler).not.toHaveBeenCalled();
        });

        it('should throw when adding handler after event is disposed', () =>
        {
            const event = new EntityEvent<void>();
            const handler = vi.fn();

            event[Symbol.dispose]();

            expect(() => event.on(handler)).toThrow();
        });

        it('should silently ignore handler when adding with disposed token', () =>
        {
            const event = new EntityEvent<void>();
            const handler = vi.fn();
            const disposeToken = new DisposeToken();

            disposeToken[Symbol.dispose]();
            event.on(handler, disposeToken);
            event.emit();

            expect(handler).not.toHaveBeenCalled();
        });

        it('should not skip emit on same value by default', () =>
        {
            const event = new EntityEvent<string>();
            const handler = vi.fn();

            event.on(handler);
            event.emit('same');
            event.emit('same');

            expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    describe('deferred', () =>
    {
        it('should not call handler immediately on emit', () =>
        {
            const event = new EntityEvent({ deferred: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit();

            expect(handler).not.toHaveBeenCalled();
        });

        it('should call handler after microtask', async () =>
        {
            const event = new EntityEvent({ deferred: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit();

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledOnce();
        });

        it('should pass value to handler after microtask', async () =>
        {
            const event = new EntityEvent<string>({ deferred: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('test');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledWith('test');
        });

        it('should deliver only the last value when multiple emits happen before microtask', async () =>
        {
            const event = new EntityEvent<string>({ deferred: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('first');
            event.emit('second');
            event.emit('third');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith('third');
        });

        it('should not call handler after event is disposed before microtask', async () =>
        {
            const event = new EntityEvent({ deferred: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit();
            event[Symbol.dispose]();

            await awaitMicrotasks();

            expect(handler).not.toHaveBeenCalled();
        });

        it('should call handler again after microtask for a new emit cycle', async () =>
        {
            const event = new EntityEvent<string>({ deferred: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('first');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith('first');

            event.emit('second');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenCalledWith('second');
        });
    });

    describe('skipEmitOnSameValue', () =>
    {
        it('should skip emit when value is the same as last emitted', () =>
        {
            const event = new EntityEvent<string>({ skipEmitOnSameValue: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('value');
            event.emit('value');

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith('value');
        });

        it('should emit when value is different from last emitted', () =>
        {
            const event = new EntityEvent<string>({ skipEmitOnSameValue: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('first');
            event.emit('second');

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenCalledWith('first');
            expect(handler).toHaveBeenCalledWith('second');
        });

        it('should emit again for the same value after a different value', () =>
        {
            const event = new EntityEvent<string>({ skipEmitOnSameValue: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('a');
            event.emit('b');
            event.emit('a');

            expect(handler).toHaveBeenCalledTimes(3);
        });

        it('should work with void events (always emit since value is undefined)', () =>
        {
            const event = new EntityEvent({ skipEmitOnSameValue: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit();
            event.emit();

            expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    describe('deferred + skipEmitOnSameValue', () =>
    {
        it('should skip emit when same value is emitted before microtask', async () =>
        {
            const event = new EntityEvent<string>({ deferred: true, skipEmitOnSameValue: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('value');
            event.emit('value');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith('value');
        });

        it('should deliver only the last distinct value when multiple different values are emitted before microtask', async () =>
        {
            const event = new EntityEvent<string>({ deferred: true, skipEmitOnSameValue: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('first');
            event.emit('first');
            event.emit('second');
            event.emit('second');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith('second');
        });

        it('should skip emit when same value is emitted across microtask boundaries', async () =>
        {
            const event = new EntityEvent<string>({ deferred: true, skipEmitOnSameValue: true });
            const handler = vi.fn();

            event.on(handler);
            event.emit('value');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledTimes(1);

            event.emit('value');

            await awaitMicrotasks();

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });
});