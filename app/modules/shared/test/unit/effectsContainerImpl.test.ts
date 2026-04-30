import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EffectsContainerImpl } from '../../entities/effectsContainerImpl';
import { EffectsContainer } from '../../interfaces/effectsContainer';
import { DestroyedException } from '../../exceptions/destroyedException';

describe('EffectsContainerIml', () =>
{
    beforeEach(() =>
    {
        // Clear static current before each test
        EffectsContainer.current = undefined;
    });

    describe('withContainer', () =>
    {
        it('should set itself as current during action execution', () =>
        {
            const container = new EffectsContainerImpl();
            let capturedCurrent: EffectsContainer | undefined;

            container.withContainer(() =>
            {
                capturedCurrent = EffectsContainer.current;
            });

            expect(capturedCurrent).toBe(container);
        });

        it('should restore previous current after action execution', () =>
        {
            const previousContainer = new EffectsContainerImpl();
            const newContainer = new EffectsContainerImpl();

            EffectsContainer.current = previousContainer;

            newContainer.withContainer(() =>
            {
                expect(EffectsContainer.current).toBe(newContainer);
            });

            expect(EffectsContainer.current).toBe(previousContainer);
        });

        it('should restore previous current even if action throws', () =>
        {
            const previousContainer = new EffectsContainerImpl();
            const newContainer = new EffectsContainerImpl();

            EffectsContainer.current = previousContainer;

            expect(() =>
            {
                newContainer.withContainer(() =>
                {
                    throw new Error('Test error');
                });
            }).toThrow('Test error');

            expect(EffectsContainer.current).toBe(previousContainer);
        });

        it('should throw DestroyedException if container is destroyed', () =>
        {
            const container = new EffectsContainerImpl();
            container.destroy();

            expect(() =>
            {
                container.withContainer(() => { });
            }).toThrow(DestroyedException);
        });
    });

    describe('register', () =>
    {
        it('should register a destroy callback', () =>
        {
            const container = new EffectsContainerImpl();
            const callback = vi.fn();

            container.register(callback);
            container.destroy();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should not register duplicate callbacks', () =>
        {
            const container = new EffectsContainerImpl();
            const callback = vi.fn();

            container.register(callback);
            container.register(callback); // Same reference
            container.destroy();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should throw DestroyedException if container is destroyed', () =>
        {
            const container = new EffectsContainerImpl();
            container.destroy();

            expect(() =>
            {
                container.register(() => { });
            }).toThrow(DestroyedException);
        });
    });

    describe('destroy', () =>
    {
        it('should execute all registered callbacks', () =>
        {
            const container = new EffectsContainerImpl();
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            container.register(callback1);
            container.register(callback2);
            container.destroy();

            expect(callback1).toHaveBeenCalledTimes(1);
            expect(callback2).toHaveBeenCalledTimes(1);
        });

        it('should clear callbacks after execution', () =>
        {
            const container = new EffectsContainerImpl();
            const callback = vi.fn();

            container.register(callback);
            container.destroy();
            callback.mockClear();

            // If destroy is called again, callback should not be called
            container.destroy();
            expect(callback).not.toHaveBeenCalled();
        });

        it('should mark container as destroyed', () =>
        {
            const container = new EffectsContainerImpl();
            container.destroy();

            expect(() => container.withContainer(() => { })).toThrow(DestroyedException);
            expect(() => container.register(() => { })).toThrow(DestroyedException);
        });
    });
});