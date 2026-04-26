import { describe, it, expect, vi } from 'vitest';
import { OverlayBase } from '../../entities/overlayBase';
import { EffectsContainer } from '@/modules/shared/interfaces/effectsContainer';

const createMockOverlayElement = (id: string) =>
{
    return {
        key: `${id}`,

        component: {
            setup: vi.fn(),
        },

        onClose: {
            subscribe: vi.fn(),
            destroy: vi.fn(),
        },

        close: vi.fn(),
    };
};

describe('OverlayBase', () =>
{
    describe('getElements', () =>
    {
        it('should return observable with empty array initially', () =>
        {
            const overlay = new OverlayBase();
            const observable = overlay.getElements();
            expect(observable).toBeDefined();
            expect(observable.value).toEqual([]);
        });
    });

    describe('addElement', () =>
    {
        it('should add element to elements list', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');
            overlay.addElement(element);
            const elements = overlay.getElements().value;
            expect(elements).toContain(element);
            expect(elements.length).toBe(1);
        });

        it('should not add duplicate element', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');
            overlay.addElement(element);

            expect(() => overlay.addElement(element)).toThrow();
        });

        it('should subscribe to element onClose', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');
            overlay.addElement(element);

            expect(element.onClose.subscribe).toHaveBeenCalledTimes(1);
        });
    });

    describe('removeElement', () =>
    {
        it('should remove existing element', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');

            overlay.addElement(element);
            expect(overlay.getElements().value).toContain(element);

            overlay.removeElement(element);
            expect(overlay.getElements().value).not.toContain(element);
            expect(overlay.getElements().value.length).toBe(0);
        });

        it('should throw error if element not present', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');
            const otherElement = createMockOverlayElement('2');
            overlay.addElement(element);
            expect(() => overlay.removeElement(otherElement)).toThrow();
        });

        it('should unsubscribe from onClose when removing element', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');
            const unsubscribeMock = vi.fn();

            element.onClose.subscribe.mockImplementation(() =>
            {
                EffectsContainer.current?.register(unsubscribeMock);
                return unsubscribeMock;
            });

            overlay.addElement(element);
            overlay.removeElement(element);

            expect(unsubscribeMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('integration', () =>
    {
        it('should remove element when onClose emits', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');

            let closeCallback: (() => void) | undefined;

            element.onClose.subscribe.mockImplementation((cb) =>
            {
                closeCallback = cb;
                return vi.fn();
            });

            overlay.addElement(element);
            expect(overlay.getElements().value).toContain(element);

            // Simulate onClose emission
            closeCallback?.();
            expect(overlay.getElements().value).not.toContain(element);
        });
    });
});