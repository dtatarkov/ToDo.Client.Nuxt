import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRootNotificationBase } from '../../entities/appRootNotificationBase';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationType } from '../../types/notificationType';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import type { AppNotificationData } from '../../types/appNotificationData';
import type { AppNotification } from '../../entities/appNotification';

class AppRootNotificationBaseTestingSuite
{
    private root: AppRootNotificationBase;

    constructor()
    {
        const data = this.getNotificationData();
        this.root = this.createRootNotification(data);
    }

    setGroupId(groupId: string): this
    {
        const data = this.getNotificationData({ groupId });
        this.root = this.createRootNotification(data);

        return this;
    }

    setRootNotification(data: AppNotificationData): this
    {
        this.root = this.createRootNotification(data);

        return this;
    }

    addChildNotification(data: AppNotificationData): AppNotification | false
    {
        const result = this.root.addNotification(data);

        return result;
    }

    reset(): this
    {
        vi.resetAllMocks();

        const data = this.getNotificationData();
        this.root = this.createRootNotification(data);

        return this;
    }

    assertNotificationNotCreated(notification: AppNotification | false): this
    {
        expect(notification).toBe(false);

        return this;
    }

    assertNotificationCreated(notification: AppNotification | false): this
    {
        expect(notification).not.toBe(false);

        return this;
    }

    assertNotificationMatchesData(notification: AppNotification, data: AppNotificationData): this
    {
        expect(notification.title).toBe(data.title);
        expect(notification.description).toBe(data.description);
        expect(notification.icon).toBe(data.icon);
        expect(notification.date).toEqual(data.date);
        expect(notification.type).toBe(data.type);
        expect(notification.groupId).toBe(data.groupId);

        return this;
    }

    getRootNotification(): AppRootNotificationBase
    {
        return this.root;
    }

    getNotificationData(overrides?: Partial<AppNotificationData>): AppNotificationData
    {
        return {
            date: new Date('2024-01-01'),
            title: 'Test Title',
            description: 'Test Description',
            icon: Icon.exclamationTriangle,
            type: NotificationType.Error,

            ...overrides,
        };
    }

    assertChildrenCount(expected: number): this
    {
        expect(this.root.children.length).toBe(expected);

        return this;
    }

    assertColor(color: string): void
    {
        expect(this.root.getColor()).toBe(color);
    }

    private createRootNotification(data: AppNotificationData): AppRootNotificationBase
    {
        const rootNotification = new AppRootNotificationBase(overlayMock, data);

        return rootNotification;
    }
}

describe('AppRootNotificationBase', () =>
{
    const suite = new AppRootNotificationBaseTestingSuite();

    beforeEach(() =>
    {
        suite.reset();
    });

    describe('properties', () =>
    {
        it('should create root notification with provided data', () =>
        {
            const data = suite.getNotificationData({
                title: 'Root Title',
                description: 'Root Description',
                icon: Icon.exclamationTriangle,
                type: NotificationType.Error,
                groupId: 'root-group',
            });

            suite
                .setRootNotification(data)
                .assertNotificationMatchesData(suite.getRootNotification(), data);
        });

        it('should have empty children by default', () =>
        {
            suite.assertChildrenCount(0);
        });
    });

    describe('addNotification', () =>
    {
        it('should add notification with matching groupId and return child notification', () =>
        {
            const groupId = 'group1';

            suite.setGroupId(groupId);

            const childNotificationData = suite.getNotificationData({ groupId });
            const childNotification = suite.addChildNotification(childNotificationData);

            suite
                .assertChildrenCount(1)
                .assertNotificationCreated(childNotification)
                .assertNotificationMatchesData(<AppNotification>childNotification, childNotificationData);
        });

        it('should not add notification when root groupId is undefined', () =>
        {
            const childData = suite.getNotificationData();
            const child = suite.addChildNotification(childData);

            suite
                .assertNotificationNotCreated(child)
                .assertChildrenCount(0);
        });

        it('should not add notification with different groupId', () =>
        {
            const rootData = suite.getNotificationData({ groupId: 'root-group' });
            suite.setRootNotification(rootData);

            const childData = suite.getNotificationData({ groupId: 'child-group' });
            const child = suite.addChildNotification(childData);

            suite
                .assertNotificationNotCreated(child)
                .assertChildrenCount(0);
        });

        it('should not add notification with undefined groupId when root has groupId', () =>
        {
            const rootData = suite.getNotificationData({ groupId: 'root-group' });
            suite.setRootNotification(rootData);

            const childData = suite.getNotificationData();
            const child = suite.addChildNotification(childData);

            suite
                .assertNotificationNotCreated(child)
                .assertChildrenCount(0);
        });
    });

    describe('getColor', () =>
    {
        it('should return error color for Error notification type', () =>
        {
            suite.assertColor('error');
        });
    });
});
