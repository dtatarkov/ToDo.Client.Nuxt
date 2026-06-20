import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OverlayBase } from '../../entities/overlayBase';
import { buttonsFactoryMock } from '@/modules/uikit/mocks/buttonsFactoryMock';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ModalButtonConfirmConfigurator } from '../../entities/modalButtonConfirmConfigurator';
import { createButtonGeneralMock } from '@/modules/uikit/mocks/buttonGeneralMock';
import { messagesServiceMock } from '@/modules/shared/mocks/messagesServiceMock';
import { awaitMicrotasks } from '@/modules/shared/utils/awaitMicrotasks';
import { Icon } from '@/modules/shared/enums/icons';

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

        it('should combine modals and notifications', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            const notification = overlay.createNotification({
                title: 'Test Notification',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const elements = overlay.getElements();

            expect(elements.length).toBe(2);
            expect(elements).toContain(modal);
            expect(elements).toContain(notification);
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

        it('should return data from getData matching configuration', () =>
        {
            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
                description: testModalDescription,
            });

            expect(modal.getData()).toEqual({
                title: testModalTitle,
                description: testModalDescription,
            });
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

    describe('createNotification', () =>
    {
        it('should return data from getData matching configuration', () =>
        {
            const notification = overlay.createNotification({
                id: 'custom-id',
                title: 'Test',
                description: 'Description',
                icon: Icon.exclamationTriangle,
                color: 'warning',
            });

            expect(notification.getData()).toEqual({
                id: 'custom-id',
                title: 'Test',
                description: 'Description',
                icon: Icon.exclamationTriangle,
                color: 'warning',
            });
        });

        it('should create notification without id and add it to elements', () =>
        {
            const notification = overlay.createNotification({
                title: 'Test',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const elements = overlay.getElements();

            expect(elements).toContain(notification);
            expect(elements.length).toBe(1);
        });

        it('should create notification with new id as standalone notification', () =>
        {
            const notification = overlay.createNotification({
                id: 'group1',
                title: 'Standalone',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const elements = overlay.getElements();

            expect(elements).toContain(notification);
            expect(elements.length).toBe(1);
        });

        it('should close existing notification when creating another with the same id', () =>
        {
            const first = overlay.createNotification({
                id: 'group1',
                title: 'First',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const second = overlay.createNotification({
                id: 'group1',
                title: 'Second',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const elements = overlay.getElements();

            // First notification should be closed (removed from elements)
            expect(elements).not.toContain(first);
            expect(elements).toContain(second);
            expect(elements.length).toBe(1);
        });

        it('should close each previous notification when creating multiple with the same id', () =>
        {
            const first = overlay.createNotification({
                id: 'group1',
                title: 'First',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const second = overlay.createNotification({
                id: 'group1',
                title: 'Second',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const third = overlay.createNotification({
                id: 'group1',
                title: 'Third',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const elements = overlay.getElements();

            expect(elements).not.toContain(first);
            expect(elements).not.toContain(second);
            expect(elements).toContain(third);
            expect(elements.length).toBe(1);
        });
    });

    describe('onElementsChange', () =>
    {
        it('should not invoke callback immediately when element is added (deferred)', () =>
        {
            const callback = vi.fn();

            overlay.onElementsChange(callback);

            overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            expect(callback).not.toHaveBeenCalled();
        });

        it('should invoke callback after microtask when element is added', async () =>
        {
            const callback = vi.fn();

            overlay.onElementsChange(callback);

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([modal]);
        });

        it('should invoke callback after microtask when modal is removed via close()', async () =>
        {
            const callback = vi.fn();

            overlay.onElementsChange(callback);

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            await awaitMicrotasks();
            callback.mockClear();

            modal.close();

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([]);
        });

        it('should invoke callback after microtask when notification is removed via close()', async () =>
        {
            const callback = vi.fn();

            overlay.onElementsChange(callback);

            const notification = overlay.createNotification({
                title: 'Test',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            await awaitMicrotasks();
            callback.mockClear();

            notification.close();

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([]);
        });

        it('should invoke callback after microtask when notification with same id replaces existing one', async () =>
        {
            overlay.createNotification({
                id: 'group1',
                title: 'First',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            const callback = vi.fn();
            overlay.onElementsChange(callback);

            overlay.createNotification({
                id: 'group1',
                title: 'Second',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should deliver only the last elements state when multiple operations happen before microtask', async () =>
        {
            const callback = vi.fn();

            overlay.onElementsChange(callback);

            const modal = overlay.createModal({
                title: testModalTitle,
                content: createContentMock(),
            });

            const notification = overlay.createNotification({
                title: 'Test',
                description: '',
                icon: Icon.questionMarkCircle,
            });

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([modal, notification]);
        });
    });
});