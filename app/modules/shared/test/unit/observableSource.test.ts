import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ObservableSource } from '../../entities/observableSource';
import { EffectsContainer } from '../../interfaces/effectsContainer';
import { EffectsContainerImpl } from '../../entities/effectsContainerImpl';

describe('ObservableSource', () =>
{
    beforeEach(() =>
    {
        EffectsContainer.current = new EffectsContainerImpl();
    });

    afterEach(() =>
    {
        EffectsContainer.current?.destroy();
        EffectsContainer.current = undefined;
    });

    describe('initialization', () =>
    {
        it('should hold initial value', () =>
        {
            const source = new ObservableSource(42);
            expect(source.value).toBe(42);
        });

        it('should accept null as initial value', () =>
        {
            const source = new ObservableSource(null);
            expect(source.value).toBeNull();
        });

        it('should accept undefined as initial value', () =>
        {
            const source = new ObservableSource(undefined);
            expect(source.value).toBeUndefined();
        });
    });

    describe('value setter', () =>
    {
        it('should update value', () =>
        {
            const source = new ObservableSource('old');
            source.value = 'new';
            expect(source.value).toBe('new');
        });

        it('should emit to subscribers', () =>
        {
            const source = new ObservableSource(0);

            let receivedValue: number | undefined;

            const unsubscribe = source.subscribe((value) =>
            {
                receivedValue = value;
            });

            source.value = 5;
            expect(receivedValue).toBe(5);

            unsubscribe();
        });

        it('should emit to multiple subscribers', () =>
        {
            const source = new ObservableSource(0);
            const values: number[] = [];
            const unsubscribe1 = source.subscribe((v) => values.push(v * 10));
            const unsubscribe2 = source.subscribe((v) => values.push(v * 100));

            source.value = 2;
            expect(values).toEqual([20, 200]);

            unsubscribe1();
            unsubscribe2();
        });

        it('should not emit if value is unchanged', () =>
        {
            const source = new ObservableSource(10);
            let callCount = 0;
            source.subscribe(() => callCount++);

            source.value = 10; // same value

            expect(callCount).toBe(0);
        });
    });

    describe('mutate', () =>
    {
        it('should mutate object properties and emit', () =>
        {
            const source = new ObservableSource({ a: 1, b: 2 });
            let receivedValue: { a: number; b: number; } | undefined;

            source.subscribe((value) => { receivedValue = value; });
            source.mutate({ a: 3 });

            expect(source.value).toEqual({ a: 3, b: 2 });
            expect(receivedValue).toEqual({ a: 3, b: 2 });
        });

        it('should not emit if mutation data is empty object', () =>
        {
            const source = new ObservableSource({ a: 1 });
            let callCount = 0;

            source.subscribe(() => callCount++);
            source.mutate({});

            expect(callCount).toBe(0);
            expect(source.value).toEqual({ a: 1 });
        });

        it('should throw if value is not an object', () =>
        {
            const source = new ObservableSource(42);
            expect(() => (source as ObservableSource<any>).mutate({})).toThrow();
        });

        it('should throw if mutation data is not an object', () =>
        {
            const source = new ObservableSource({ a: 1 });

            expect(() => source.mutate(123 as any)).toThrow();
        });

        it('should handle multiple mutations', () =>
        {
            const source = new ObservableSource({ x: 0, y: 0 });
            const capturedValues: Array<{ x: number; y: number; }> = [];

            source.subscribe((value) => capturedValues.push({ ...value }));
            source.mutate({ x: 1 });
            source.mutate({ y: 2 });
            source.mutate({ x: 3, y: 4 });

            expect(capturedValues).toEqual([
                { x: 1, y: 0 },
                { x: 1, y: 2 },
                { x: 3, y: 4 }
            ]);

            expect(source.value).toEqual({ x: 3, y: 4 });
        });
    });

    describe('subscription', () =>
    {
        it('should allow unsubscribing', () =>
        {
            const source = new ObservableSource(0);
            let callCount = 0;
            const unsubscribe = source.subscribe(() => callCount++);

            source.value = 1;
            expect(callCount).toBe(1);

            unsubscribe();
            source.value = 2;
            expect(callCount).toBe(1); // unchanged
        });

        it('should handle multiple unsubscribes', () =>
        {
            const source = new ObservableSource(0);
            const unsubscribe = source.subscribe(() => { });
            unsubscribe();
            unsubscribe(); // second call should not throw
            source.value = 1; // should not cause issues
        });

        it('should not call subscriber after destroy', () =>
        {
            const source = new ObservableSource(0);
            let callCount = 0;
            source.subscribe(() => callCount++);

            source.destroy();
            expect(() => { source.value = 1; }).toThrow();
            expect(callCount).toBe(0);
        });
    });

    describe('destroy', () =>
    {
        it('should clear subscriptions', () =>
        {
            const source = new ObservableSource(0);
            let callCount = 0;
            source.subscribe(() => callCount++);

            source.destroy();
            expect(() => { source.value = 1; }).toThrow();
            expect(callCount).toBe(0);
        });

        it('should not allow re-subscribing after destroy', () =>
        {
            const source = new ObservableSource(0);
            source.destroy();
            expect(() => source.subscribe(() => { })).toThrow();
        });
    });
});