import { describe, it, expect, vi } from 'vitest';
import { EntityEvent } from '../../entities/entityEvent';
import { DisposeToken } from '../../entities/disposeToken';

describe('EntityEvent', () =>
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
});