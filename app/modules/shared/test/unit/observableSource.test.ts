import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ObservableSource } from '../../entities/observableSource';
import { EffectsContainer } from '../../interfaces/effectsContainer';
import { EffectsContainerBase } from '../../entities/effectsContainerBase';

describe('ObservableSource', () =>
{
    beforeEach(() =>
    {
        EffectsContainer.current = new EffectsContainerBase();
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