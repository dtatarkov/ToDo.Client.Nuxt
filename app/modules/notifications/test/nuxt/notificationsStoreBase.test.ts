import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppNotificationsStoreBase } from '../../entities/appNotificationsStoreBase';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../../types/notificationType';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import { DisposedException } from '@/modules/shared/exceptions/disposedException';
import type { AppNotificationData } from '../../types/appNotificationData';
import type { AppNotification } from '../../entities/appNotification';
import { awaitMicrotasks } from '@/modules/shared/utils/awaitMicrotasks';

class NotificationsStoreBaseTestingSuite
{
    private store = this.createStore();
    private notificationsData = new Map<AppNotification, AppNotificationData>();
    private notificationsAdded = new Array<AppNotification>();
    private notificationsChangeHandler = vi.fn();
    private notificationIndex = 0;

    addNotification(): this
    {
        this.notificationIndex++;

        const data = this.createNotificationData();
        const notification = this.store.addNotification(data);

        this.notificationsData.set(notification, data);
        this.notificationsAdded.push(notification);

        return this;
    }

    attachNotificationsChangeHandler(): this
    {
        this.store.notifications.on(this.notificationsChangeHandler);

        return this;
    }

    disposeStore(): this
    {
        this.store[Symbol.dispose]();

        return this;
    }

    reset(): this
    {
        vi.resetAllMocks();

        this.store = this.createStore();
        this.notificationsData = new Map();
        this.notificationsAdded = [];
        this.notificationIndex = 0;

        return this;
    }

    assertNotificationsCount(expected: number): this
    {
        expect(this.store.notifications.value.length).toBe(expected);

        return this;
    }

    assertNotificationsMatchesData(): this
    {
        for (const [notification, data] of this.notificationsData)
        {
            this.assertNotificationMatchesData(notification, data);
        }

        return this;
    }

    assertStoreNotificationsMatchesAddedNotifications(): this
    {
        const notifications = this.store.notifications.value;

        expect(notifications).toEqual(this.notificationsAdded);

        return this;
    }

    assertNotificationsChangeHandlerCalledTimes(expected: number): this
    {
        expect(this.notificationsChangeHandler).toHaveBeenCalledTimes(expected);

        return this;
    }

    assertNotificationsChangeHandlerCalledWithAddedNotifications(): this
    {
        expect(this.notificationsChangeHandler).toHaveBeenCalledWith(this.notificationsAdded);

        return this;
    }

    assertPublicAPIThrowsDisposedException(): void
    {
        expect(() =>
        {
            this.addNotification();
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

    private createNotificationData(): AppNotificationData
    {
        const data: AppNotificationData = {
            date: new Date(),
            title: `Test Title ${this.notificationIndex}`,
            description: `Test Description ${this.notificationIndex}`,
            icon: Icon.bellInactive,
            type: NotificationType.Error,
        };

        return data;
    }

    private assertNotificationMatchesData(notification: AppNotification, data: AppNotificationData): void
    {
        expect(notification.title).toBe(data.title);
        expect(notification.description).toBe(data.description);
        expect(notification.icon).toBe(data.icon);
        expect(notification.date).toEqual(data.date);
        expect(notification.type).toBe(data.type);
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
            suite
                .addNotification()
                .assertNotificationsCount(1)
                .assertNotificationsMatchesData();
        });

        it('should emit on notification added', async () =>
        {
            suite
                .attachNotificationsChangeHandler()
                .addNotification();

            await awaitMicrotasks();

            suite
                .assertNotificationsChangeHandlerCalledTimes(1)
                .assertNotificationsChangeHandlerCalledWithAddedNotifications();
        });

        it('should add multiple notifications', () =>
        {
            suite
                .addNotification()
                .addNotification()
                .assertNotificationsCount(2)
                .assertNotificationsMatchesData();
        });
    });

    describe('notifications', () =>
    {
        it('should return all added notifications', () =>
        {
            suite
                .addNotification()
                .addNotification()
                .assertNotificationsCount(2)
                .assertNotificationsMatchesData()
                .assertStoreNotificationsMatchesAddedNotifications();
        });

        it('should return empty array when no notifications added', () =>
        {
            suite.assertNotificationsCount(0);
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