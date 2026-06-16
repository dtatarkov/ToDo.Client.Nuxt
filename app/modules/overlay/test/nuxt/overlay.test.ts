import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OverlayBase } from '../../entities/overlayBase';
import { buttonsFactoryMock } from '@/modules/uikit/mocks/buttonsFactoryMock';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ModalButtonConfirmConfigurator } from '../../entities/modalButtonConfirmConfigurator';
import { createButtonGeneralMock } from '@/modules/uikit/mocks/buttonGeneralMock';
import { messagesServiceMock } from '@/modules/shared/mocks/messagesServiceMock';

const testModalTitle = 'Test Modal';
const testModalDescription = 'Test Description';

function createContentMock(): UIElement
{
    return {
        key: '',
        vnode: {} as VNode,
        [Symbol.dispose]: vi.fn(),
    };
}

describe('OverlayBase', () =>
{
    let overlay: OverlayBase;

    beforeEach(() =>
    {
        vi.resetAllMocks();

        overlay = new OverlayBase(buttonsFactoryMock, messagesServiceMock);

        messagesServiceMock.getMessage.mockImplementation(key =>
        {
            switch (key)
            {
                case 'button.create': return 'Добавить';
                case 'button.save': return 'Сохранить';
                case 'button.cancel': return 'Отменить';
            }
        });
    });

    describe('getElements', () =>
    {
        it('should return empty array initially', () =>
        {
            const observable = overlay.getElements();
            expect(observable).toBeDefined();
            expect(observable).toEqual([]);
        });
    });

    describe('createModal', () =>
    {
        it('should create modal and add it to elements list', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            const elements = overlay.getElements();

            expect(elements).toContain(modal);
            expect(elements.length).toBe(1);
        });

        it('should create multiple modals', () =>
        {
            const modal1 = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            const modal2 = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            const elements = overlay.getElements();

            expect(elements.length).toBe(2);
            expect(elements).toContain(modal1);
            expect(elements).toContain(modal2);
        });

        it('should set title from configuration', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            expect(modal.title).toBe(testModalTitle);
        });

        it('should set description as empty string when not provided', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            expect(modal.description).toBe('');
        });

        it('should set description from configuration', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
                description: testModalDescription,
            });

            expect(modal.description).toBe(testModalDescription);
        });

        it('should set content from configuration', () =>
        {
            const content = createContentMock();

            const modal = overlay.createModal({
                title: testModalTitle,
                content,
            });

            expect(modal.content).toBe(content);
        });

        it('should have empty buttons when no buttons are configured', () =>
        {

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            expect(modal.buttonConfirm).toBeUndefined();
            expect(modal.buttonCancel).toBeUndefined();
        });

        it('should add cancel button when buttonCancel is true', () =>
        {
            const buttonCancel = createButtonGeneralMock();
            buttonsFactoryMock.createButtonGeneral.mockReturnValue(buttonCancel);

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
                buttonCancel: true,
            });

            expect(modal.buttonCancel).toBe(buttonCancel);
            expect(modal.buttonCancel?.title).toBe('Отменить');
        });

        it('should add confirm button when buttonConfirm is provided', () =>
        {


            const buttonConfirm = createButtonGeneralMock();
            buttonsFactoryMock.createButtonGeneral.mockReturnValue(buttonConfirm);

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),

                buttonConfirm: (configurator: ModalButtonConfirmConfigurator) =>
                    configurator.asCreateButton(),
            });

            expect(modal.buttonConfirm).toBe(buttonConfirm);
            expect(modal.buttonConfirm?.title).toBe('Добавить');
        });

        it('should add both confirm and cancel buttons when both are configured', () =>
        {
            buttonsFactoryMock.createButtonGeneral
                .mockReturnValueOnce(createButtonGeneralMock())
                .mockReturnValueOnce(createButtonGeneralMock());

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),

                buttonConfirm: (configurator: ModalButtonConfirmConfigurator) =>
                    configurator.asEditButton(),

                buttonCancel: true,
            });

            expect(modal.buttonCancel).toBeDefined();
            expect(modal.buttonCancel?.title).toBe('Отменить');

            expect(modal.buttonConfirm).toBeDefined();
            expect(modal.buttonConfirm?.title).toBe('Сохранить');
        });
    });

    describe('removeElement', () =>
    {
        it('should remove existing element', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            expect(overlay.getElements()).toContain(modal);

            overlay.removeElement(modal);
            expect(overlay.getElements()).not.toContain(modal);
            expect(overlay.getElements().length).toBe(0);
        });

        it('should throw error if element not present', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            overlay.removeElement(modal);
            expect(() => overlay.removeElement(modal)).toThrow();
        });
    });

    describe('onElementsChange', () =>
    {
        it('should invoke callback when element is added', () =>
        {
            const callback = vi.fn();

            overlay.onElementsChange(callback);

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([modal]);
        });

        it('should invoke callback when element is removed', () =>
        {
            const callback = vi.fn();

            overlay.onElementsChange(callback);

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            callback.mockClear();

            overlay.removeElement(modal);

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([]);
        });
    });
});