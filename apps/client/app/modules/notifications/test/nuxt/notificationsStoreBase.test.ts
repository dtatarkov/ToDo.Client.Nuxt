import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppNotificationsStoreBase } from '../../entities/appNotificationsStoreBase';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../../types/notificationType';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import { DisposedException } from '@/modules/shared/exceptions/disposedException';
import type { AppNotificationData } from '../../types/appNotificationData';
import type { AppNotification } from '../../entities/appNotification';
import { awaitMicrotasks } from '@/modules/shared/utils/awaitMicrotasks';
import type { AppRootNotification } from '../../entities/appRootNotification';

class NotificationsStoreBaseTestingSuite
{
    private store = this.createStore();
    private notificationsChangeHandler = vi.fn();

    createNotificationData(dataOverrides?: Partial<AppNotificationData>): AppNotificationData
    {
        const data: AppNotificationData = {
            date: new Date(),
            title: `Test Title`,
            description: `Test Description`,
            icon: Icon.bellInactive,
            type: NotificationType.Error,
        };

        return {
            ...data,
            ...dataOverrides,
        };
    }

    createNotification(data: AppNotificationData): AppNotification
    {
        return this.store.addNotification(data);
    }

    attachNotificationsChangeHandler(): void
    {
        this.store.notifications.on(this.notificationsChangeHandler);
    }

    disposeStore(): void
    {
        this.store[Symbol.dispose]();
    }

    reset(): void
    {
        vi.resetAllMocks();

        this.store = this.createStore();
    }

    getNotifications(): readonly AppRootNotification[]
    {
        return this.store.notifications.value;
    }

    assertNotificationMatchesData(notification: AppNotification, data: AppNotificationData): void
    {
        expect(notification.title).toBe(data.title);
        expect(notification.description).toBe(data.description);
        expect(notification.icon).toBe(data.icon);
        expect(notification.date).toEqual(data.date);
        expect(notification.type).toBe(data.type);
        expect(notification.groupId).toBe(data.groupId);
    }

    assertNotificationsCount(expected: number): void
    {
        expect(this.getNotifications().length).toBe(expected);
    }

    assertRootNotificationChildrenCount(notification: AppRootNotification, expected: number): void
    {
        expect(notification.children.length).toBe(expected);
    }

    assertNotificationGroupId(notification: AppNotification, expected: string | undefined): void
    {
        expect(notification.groupId).toBe(expected);
    }

    assertStoreNotificationsEqual(notifications: readonly AppNotification[]): void
    {
        expect(this.store.notifications.value).toEqual(notifications);
    }

    assertNotificationsChangeHandlerCalledTimes(expected: number): void
    {
        expect(this.notificationsChangeHandler).toHaveBeenCalledTimes(expected);
    }

    assertNotificationsChangeHandlerCalledWith(notifications: readonly AppNotification[]): void
    {
        expect(this.notificationsChangeHandler).toHaveBeenCalledWith(notifications);
    }

    assertPublicAPIThrowsDisposedException(): void
    {
        expect(() =>
        {
            this.createNotification(this.createNotificationData());
        }).toThrow(DisposedException);

        expect(() =>
        {
            this.attachNotificationsChangeHandler();
        }).toThrow(DisposedException);
    }

    private createStore(): AppNotificationsStoreBase
    {
        const store = new AppNotificationsStoreBase(overlayMock);

        return store;
    }
}

describe('NotificationsStoreBase', () =>
{
    const suite = new NotificationsStoreBaseTestingSuite();

    beforeEach(() =>
    {
        suite.reset();
    });

    describe('addNotification', () =>
    {
        it('should create NotificationBase and add to list', () =>
        {
            const notificationData = suite.createNotificationData();
            const notification = suite.createNotification(notificationData);

            suite.assertNotificationsCount(1);
            suite.assertStoreNotificationsEqual([notification]);
            suite.assertNotificationMatchesData(notification, notificationData);
        });

        it('should emit on notification added', async () =>
        {
            suite.attachNotificationsChangeHandler();
            const notification = suite.createNotification(suite.createNotificationData());

            await awaitMicrotasks();

            suite.assertNotificationsChangeHandlerCalledTimes(1);
            suite.assertNotificationsChangeHandlerCalledWith([notification]);
        });

        it('should add multiple notifications', () =>
        {
            const notification1 = suite.createNotification(suite.createNotificationData());
            const notification2 = suite.createNotification(suite.createNotificationData());

            suite.assertNotificationsCount(2);
            suite.assertStoreNotificationsEqual([notification1, notification2]);
        });

        it('should add multiple notifications with same groupId to same root notification', () =>
        {
            const groupId = 'group-1';

            const notification1 = suite.createNotification(suite.createNotificationData({ groupId }));
            const notification2 = suite.createNotification(suite.createNotificationData({ groupId }));

            const notification = suite.getNotifications()[0];

            suite.assertNotificationsCount(1);
            suite.assertStoreNotificationsEqual([notification1]);
            suite.assertNotificationGroupId(notification1, groupId);
            suite.assertNotificationGroupId(notification2, groupId);
            suite.assertRootNotificationChildrenCount(<AppRootNotification>notification, 1);
        });

        it('should create separate root notifications for different groupIds', () =>
        {
            const group1 = 'group-1';
            const group2 = 'group-2';

            const notification1 = suite.createNotification(suite.createNotificationData({ groupId: group1 }));
            const notification2 = suite.createNotification(suite.createNotificationData({ groupId: group2 }));

            suite.assertStoreNotificationsEqual([notification1, notification2]);
            suite.assertNotificationGroupId(notification1, group1);
            suite.assertNotificationGroupId(notification2, group2);
            suite.assertNotificationsCount(2);
        });

        it('should create new root notification with no children when there are no previous notifications with the same groupId', () =>
        {
            const groupId = 'group-1';

            suite.createNotification(suite.createNotificationData({ groupId }));

            const notification = suite.getNotifications()[0];

            suite.assertNotificationsCount(1);
            suite.assertStoreNotificationsEqual([<AppNotification>notification]);
            suite.assertNotificationGroupId(<AppNotification>notification, groupId);
            suite.assertRootNotificationChildrenCount(<AppRootNotification>notification, 0);
        });
    });

    describe('[Symbol.dispose]', () =>
    {
        it('should throw DisposedException when calling public API', () =>
        {
            suite.disposeStore();
            suite.assertPublicAPIThrowsDisposedException();
        });
    });
});
