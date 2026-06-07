import { describe, it, expect, vi } from 'vitest';
import { callbacksWrapper } from '../../entities/callbacksWrapper';
import type { Action } from '../../types/action';

interface TestCallbacks extends Record<string, Action<any[]>>
{
    foo: Action<[string]>;
    bar: Action<[number, boolean]>;
}

describe('callbacksWrapper', () =>
{
    it('should set callbacks and invoke them', () =>
    {
        const wrapper = callbacksWrapper<TestCallbacks>();
        const fooFn = vi.fn();
        const barFn = vi.fn();

        wrapper({ foo: fooFn, bar: barFn });

        wrapper.foo?.('hello');
        wrapper.bar?.(42, true);

        expect(fooFn).toHaveBeenCalledWith('hello');
        expect(barFn).toHaveBeenCalledWith(42, true);
    });

    it('should throw if set more than once', () =>
    {
        const wrapper = callbacksWrapper<TestCallbacks>();

        wrapper({ foo: vi.fn(), bar: vi.fn() });

        expect(() => wrapper({ foo: vi.fn() })).toThrow('Callbacks already set');
    });

    it('should allow setting partial callbacks', () =>
    {
        const wrapper = callbacksWrapper<TestCallbacks>();
        const fooFn = vi.fn();

        wrapper({ foo: fooFn });

        wrapper.foo?.('test');
        expect(fooFn).toHaveBeenCalledWith('test');
        expect(wrapper.bar).toBeUndefined();
    });

    it('should not invoke any callback if never set', () =>
    {
        const wrapper = callbacksWrapper<TestCallbacks>();

        expect(wrapper.foo).toBeUndefined();
        expect(wrapper.bar).toBeUndefined();
    });
});