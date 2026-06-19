import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotificationsStoreBase } from '../../entities/notificationsStoreBase';
import { createNotificationMock, notificationMock } from '../../mocks/notificationMock';
import { awaitMicrotasks } from '@/modules/shared/utils/awaitMicrotasks';

describe('NotificationsStoreBase', () =>
{
    let store: NotificationsStoreBase;

    beforeEach(() =>
    {
        store = new NotificationsStoreBase();
    });

    describe('add', () =>
    {
        it('should add notification without id to elements', () =>
        {
            store.add(notificationMock);

            expect(store.getElements()).toContain(notificationMock);
            expect(store.getElements().length).toBe(1);
        });

        it('should close existing notification when adding another with the same id', () =>
        {
            const existing = createNotificationMock({ id: 'sameId' });
            const newNotification = createNotificationMock({ id: 'sameId' });

            store.add(existing);
            store.add(newNotification);

            const elements = store.getElements();

            expect(existing.close).toHaveBeenCalledTimes(1);
            expect(newNotification.close).not.toHaveBeenCalled();
            expect(elements).toContain(newNotification);
        });

        it('should add multiple standalone notifications', () =>
        {
            const notificationMock1 = createNotificationMock();
            const notificationMock2 = createNotificationMock();

            store.add(notificationMock1);
            store.add(notificationMock2);

            expect(store.getElements().length).toBe(2);
            expect(store.getElements()).toContain(notificationMock1);
            expect(store.getElements()).toContain(notificationMock2);
        });

        it('should add multiple notifications with different ids', () =>
        {
            const notification1 = createNotificationMock({ id: 'group1' });
            const notification2 = createNotificationMock({ id: 'group2' });

            store.add(notification1);
            store.add(notification2);

            expect(store.getElements().length).toBe(2);
            expect(store.getElements()).toContain(notification1);
            expect(store.getElements()).toContain(notification2);
        });

        it('should close each existing notification when adding multiple with the same id', () =>
        {
            const first = createNotificationMock({ id: 'group1' });
            const second = createNotificationMock({ id: 'group1' });
            const third = createNotificationMock({ id: 'group1' });

            store.add(first);
            store.add(second);
            store.add(third);

            expect(first.close).toHaveBeenCalledTimes(2);
            expect(second.close).toHaveBeenCalledTimes(1);
            expect(third.close).not.toHaveBeenCalled();
            expect(store.getElements()).toContain(third);
        });
    });

    describe('remove', () =>
    {
        it('should remove standalone notification from elements', () =>
        {
            store.add(notificationMock);
            store.remove(notificationMock);

            expect(store.getElements()).not.toContain(notificationMock);
            expect(store.getElements().length).toBe(0);
        });

        it('should remove notification with id from elements', () =>
        {
            const notificationMock = createNotificationMock({ id: 'group1' });

            store.add(notificationMock);
            store.remove(notificationMock);

            expect(store.getElements()).not.toContain(notificationMock);
            expect(store.getElements().length).toBe(0);
        });

        it('should allow adding notification with same id after previous one is removed', () =>
        {
            const notification1 = createNotificationMock({ id: 'group1' });
            const notification2 = createNotificationMock({ id: 'group1' });

            store.add(notification1);
            store.remove(notification1);
            store.add(notification2);

            expect(store.getElements()).toContain(notification2);
            expect(store.getElements().length).toBe(1);
            expect(notification1.close).not.toHaveBeenCalled();
        });

        it('should throw if element not present', () =>
        {
            expect(() => store.remove(notificationMock)).toThrow();
        });
    });

    describe('getElements', () =>
    {
        it('should return empty array initially', () =>
        {
            expect(store.getElements()).toEqual([]);
        });
    });

    describe('onElementsChange', () =>
    {
        it('should not invoke callback immediately on add (deferred)', () =>
        {
            const callback = vi.fn();

            store.onElementsChange(callback);
            store.add(notificationMock);

            expect(callback).not.toHaveBeenCalled();
        });

        it('should invoke callback after microtask on add', async () =>
        {
            const callback = vi.fn();

            store.onElementsChange(callback);
            store.add(notificationMock);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([notificationMock]);
        });

        it('should invoke callback after microtask on remove', async () =>
        {
            const callback = vi.fn();

            store.add(notificationMock);
            store.onElementsChange(callback);
            store.remove(notificationMock);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([]);
        });

        it('should invoke callback after microtask when notification with same id is added', async () =>
        {
            const store = new NotificationsStoreBase();
            const callback = vi.fn();
            const existing = createNotificationMock({ id: 'group1' });
            const newNotification = createNotificationMock({ id: 'group1' });

            store.add(existing);
            store.onElementsChange(callback);
            store.add(newNotification);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([existing, newNotification]);
        });

        it('should deliver only the last elements state when multiple adds happen before microtask', async () =>
        {
            const callback = vi.fn();
            const notification1 = createNotificationMock();
            const notification2 = createNotificationMock();

            store.onElementsChange(callback);
            store.add(notification1);
            store.add(notification2);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([notification1, notification2]);
        });
    });
});