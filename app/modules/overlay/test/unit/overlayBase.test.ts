import { describe, it, expect, vi } from 'vitest';
import { OverlayBase } from '../../entities/overlayBase';

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
        setOverlay: vi.fn(),
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

        it('should set element overlay', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');

            overlay.addElement(element);
            expect(element.setOverlay).toHaveBeenCalledWith(overlay);
            expect(overlay.getElements().value).toContain(element);
        });

        it('should not add duplicate element', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');
            overlay.addElement(element);

            expect(() => overlay.addElement(element)).toThrow();
        });

        it('should call setOverlay on element with overlay instance', () =>
        {
            const overlay = new OverlayBase();
            const element = createMockOverlayElement('1');
            overlay.addElement(element);

            expect(element.setOverlay).toHaveBeenCalledTimes(1);
            expect(element.setOverlay).toHaveBeenCalledWith(overlay);
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

    });
});