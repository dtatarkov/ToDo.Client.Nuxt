import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ObservableComputed } from '../../entities/observableComputed';
import { ObservableSource } from '../../entities/observableSource';
import { DestroyedException } from '../../exceptions/destroyedException';
import { awaitMicrotasks } from '../../utils/awaitMicrotasks';
import { EffectsContainer } from '../../interfaces/effectsContainer';
import { EffectsContainerImpl } from '../../entities/effectsContainerImpl';

describe('ObservableComputed', () =>
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
        it('should compute initial value from factory', () =>
        {
            const computed = new ObservableComputed(() => 42);
            expect(computed.value).toBe(42);
        });

        it('should compute initial value with dependency', () =>
        {
            const dep1 = new ObservableSource(5);
            const dep2 = new ObservableSource(2);
            const computed = new ObservableComputed(() => dep1.value * dep2.value);

            expect(computed.value).toBe(10);
        });
    });

    describe('value reactivity', () =>
    {
        it('should update when dependency changes', () =>
        {
            const source = new ObservableSource(0);
            const computed = new ObservableComputed(() => source.value + 1);

            expect(computed.value).toBe(1);

            source.value = 10;
            expect(computed.value).toBe(11);
        });

        it('should only recompute when dependency changes', () =>
        {
            const source = new ObservableSource(1);
            let computeCount = 0;

            const computed = new ObservableComputed(() =>
            {
                computeCount++;
                return source.value * 2;
            });

            computed.subscribe(() => { });

            // initial compute
            expect(computed.value).toBe(2);
            expect(computeCount).toBe(1);

            // reading value again should not recompute (cached)
            expect(computed.value).toBe(2);
            expect(computeCount).toBe(1);

            // change dependency
            source.value = 3;
            expect(computed.value).toBe(6);
            expect(computeCount).toBe(2);
        });

        it('should track multiple dependencies', () =>
        {
            const dep1 = new ObservableSource(2);
            const dep2 = new ObservableSource(3);

            const computed = new ObservableComputed(() => dep1.value + dep2.value);

            expect(computed.value).toBe(5);

            dep1.value = 10;
            expect(computed.value).toBe(13);

            dep2.value = 20;
            expect(computed.value).toBe(30);
        });
    });

    describe('subscriptions', () =>
    {
        it('should emit when value changes', async () =>
        {
            const source = new ObservableSource(0);
            const computed = new ObservableComputed(() => source.value * 2);

            let receivedValue: number | undefined;

            computed.subscribe((value) =>
            {
                receivedValue = value;
            });

            source.value = 5;
            await awaitMicrotasks();
            expect(receivedValue).toBe(10);

            source.value = 10;
            await awaitMicrotasks();
            expect(receivedValue).toBe(20);
        });

        it('should not emit if value unchanged', async () =>
        {
            const source = new ObservableSource(1);
            const computed = new ObservableComputed(() => source.value);

            let emitsCount = 0;

            computed.subscribe(() => emitsCount++);

            source.value = 1; // same value
            await awaitMicrotasks();
            expect(emitsCount).toBe(0);
        });

        it('should handle multiple subscribers', async () =>
        {
            const source = new ObservableSource(0);
            const computed = new ObservableComputed(() => source.value + 1);

            let emitsCount1 = 0;
            let emitsCount2 = 0;

            const unsub1 = computed.subscribe(() => emitsCount1++);
            const unsub2 = computed.subscribe(() => emitsCount2++);

            source.value = 2;
            await awaitMicrotasks();
            expect(emitsCount1).toBe(1);
            expect(emitsCount2).toBe(1);

            unsub1();
            source.value = 3;
            await awaitMicrotasks();
            expect(emitsCount1).toBe(1);
            expect(emitsCount2).toBe(2);
        });
    });

    describe('state transitions', () =>
    {
        it('should move to destroyed state after destroy', () =>
        {
            const computed = new ObservableComputed(() => 1);
            computed.destroy();

            expect(() => computed.value).toThrow(DestroyedException);
            expect(() => computed.subscribe(() => { })).toThrow(DestroyedException);
        });
    });
});