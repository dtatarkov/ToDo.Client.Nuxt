import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppNotificationsStoreBase } from '../../entities/appNotificationsStoreBase';
import { Icon } from '@/modules/shared/enums/icons';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import { DisposedException } from '@/modules/shared/exceptions/disposedException';
import type { AppNotificationData } from '../../types/appNotificationData';
import { awaitMicrotasks } from '@/modules/shared/utils/awaitMicrotasks';

describe('NotificationsStoreBase', () =>
{
    let store: AppNotificationsStoreBase;

    beforeEach(() =>
    {
        vi.resetAllMocks();

        store = new AppNotificationsStoreBase(overlayMock);
    });

    describe('addNotification', () =>
    {
        it('should create NotificationBase and add to list', () =>
        {
            const data: AppNotificationData = {
                date: new Date('2024-01-01'),
                title: 'Test',
                description: 'Description',
                icon: Icon.bellInactive,
            };

            store.addNotification(data);

            const notifications = store.notifications.value;

            expect(notifications.length).toBe(1);
            expect(notifications[0]?.title).toBe(data.title);
            expect(notifications[0]?.description).toBe(data.description);
            expect(notifications[0]?.icon).toBe(data.icon);
            expect(notifications[0]?.date).toEqual(data.date);
        });

        it('should emit on notification added', async () =>
        {
            const callback = vi.fn();

            store.notifications.on(callback);

            store.addNotification({
                date: new Date(),
                title: 'Test',
                description: 'Description',
                icon: Icon.bellInactive,
            });

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('notifications', () =>
    {
        it('should return all added notifications', () =>
        {
            store.addNotification({
                date: new Date('2024-01-01'),
                title: 'Test 1',
                description: 'Description 1',
                icon: Icon.bellInactive,
            });

            store.addNotification({
                date: new Date('2024-01-02'),
                title: 'Test 2',
                description: 'Description 2',
                icon: Icon.check,
            });

            const notifications = store.notifications.value;

            expect(notifications.length).toBe(2);
            expect(notifications[0]?.title).toBe('Test 1');
            expect(notifications[1]?.title).toBe('Test 2');
        });

        it('should return empty array when no notifications added', () =>
        {
            expect(store.notifications.value).toEqual([]);
        });
    });

    describe('[Symbol.dispose]', () =>
    {
        it('should throw DisposedException when adding notification after disposal', () =>
        {
            store[Symbol.dispose]();

            expect(() =>
            {
                store.addNotification({
                    date: new Date(),
                    title: 'Test',
                    description: 'Description',
                    icon: Icon.bellInactive,
                });
            }).toThrow(DisposedException);
        });

        it('should throw DisposedException when subscribing to notifications after disposal', () =>
        {
            store[Symbol.dispose]();

            expect(() =>
            {
                store.notifications.on(() => { });
            }).toThrow(DisposedException);
        });
    });
});