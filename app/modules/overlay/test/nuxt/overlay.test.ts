import { describe, it, expect, vi, beforeEach } from 'vitest';
import { modalMock } from '../../mocks/modalMock';
import { OverlayBase } from '../../entities/overlayBase';
import { buttonsFactoryMock } from '@/modules/uikit/mocks/buttonsFactoryMock';

describe('OverlayBase', () =>
{
    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('getElements', () =>
    {
        it('should return observable with empty array initially', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            const observable = overlay.getElements();
            expect(observable).toBeDefined();
            expect(observable).toEqual([]);
        });
    });

    describe('addElement', () =>
    {
        it('should add element to elements list', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            overlay.addElement(modalMock);
            const elements = overlay.getElements();
            expect(elements).toContain(modalMock);
            expect(elements.length).toBe(1);
        });

        it('should set element overlay', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);

            overlay.addElement(modalMock);
            expect(modalMock.setOverlay).toHaveBeenCalledWith(overlay);
            expect(overlay.getElements()).toContain(modalMock);
        });

        it('should not add duplicate element', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            overlay.addElement(modalMock);

            expect(() => overlay.addElement(modalMock)).toThrow();
        });

        it('should call setOverlay on element with overlay instance', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            overlay.addElement(modalMock);

            expect(modalMock.setOverlay).toHaveBeenCalledTimes(1);
            expect(modalMock.setOverlay).toHaveBeenCalledWith(overlay);
        });
    });

    describe('removeElement', () =>
    {
        it('should remove existing element', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);

            overlay.addElement(modalMock);
            expect(overlay.getElements()).toContain(modalMock);

            overlay.removeElement(modalMock);
            expect(overlay.getElements()).not.toContain(modalMock);
            expect(overlay.getElements().length).toBe(0);
        });

        it('should throw error if element not present', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            expect(() => overlay.removeElement(modalMock)).toThrow();
        });

    });
});