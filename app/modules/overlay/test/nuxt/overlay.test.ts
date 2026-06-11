import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OverlayBase } from '../../entities/overlayBase';
import { buttonsFactoryMock } from '@/modules/uikit/mocks/buttonsFactoryMock';
import type { ModalConfiguration } from '../../entities/modal';
import type { UIElement } from '@/modules/uikit/entities/uiElement';

const contentMock = {
    key: '',
    vnode: {} as VNode,
} satisfies UIElement;

const modalConfiguration: ModalConfiguration = {
    title: 'Test Modal',
    content: contentMock,
};

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

    describe('createModal', () =>
    {
        it('should create modal and add it to elements list', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            const modal = overlay.createModal(modalConfiguration);
            const elements = overlay.getElements();

            expect(elements).toContain(modal);
            expect(elements.length).toBe(1);
        });

        it('should create multiple modals', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            const modal1 = overlay.createModal(modalConfiguration);
            const modal2 = overlay.createModal(modalConfiguration);
            const elements = overlay.getElements();

            expect(elements.length).toBe(2);
            expect(elements).toContain(modal1);
            expect(elements).toContain(modal2);
        });
    });

    describe('removeElement', () =>
    {
        it('should remove existing element', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            const modal = overlay.createModal(modalConfiguration);
            expect(overlay.getElements()).toContain(modal);

            overlay.removeElement(modal);
            expect(overlay.getElements()).not.toContain(modal);
            expect(overlay.getElements().length).toBe(0);
        });

        it('should throw error if element not present', () =>
        {
            const overlay = new OverlayBase(buttonsFactoryMock);
            const modal = overlay.createModal(modalConfiguration);
            overlay.removeElement(modal);
            expect(() => overlay.removeElement(modal)).toThrow();
        });
    });
});