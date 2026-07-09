import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppNotificationBase } from '../../entities/appNotificationBase';
import { Icon } from '@client/shared';
import { NotificationType } from '../../types/notificationType';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import type { AppNotificationData } from '../../types/appNotificationData';
import type { Color } from '@/modules/uikit/types/color';

class NotificationBaseTestingSuite
{
    private data: AppNotificationData;
    private notification: AppNotificationBase;

    constructor()
    {
        this.data = {
            date: new Date('2024-01-01'),
            title: 'Test Title',
            description: 'Test Description',
            icon: Icon.exclamationTriangle,
            type: NotificationType.Error,
        };

        this.notification = new AppNotificationBase(overlayMock, this.data);
    }

    createToast()
    {
        this.notification.showToast();

        return this;
    }

    assertNotificationFieldsMatchData()
    {
        expect(this.notification.date).toEqual(this.data.date);
        expect(this.notification.title).toBe(this.data.title);
        expect(this.notification.description).toBe(this.data.description);
        expect(this.notification.icon).toBe(this.data.icon);
        expect(this.notification.type).toBe(this.data.type);

        return this;
    }

    assertToastCreated()
    {
        expect(overlayMock.createToast).toHaveBeenCalledTimes(1);

        return this;
    }

    assertToastDataMatchesNotificationData()
    {
        expect(overlayMock.createToast).toHaveBeenCalledWith({
            title: this.data.title,
            description: this.data.description,
            icon: this.data.icon,
            color: 'error',
        });

        return this;
    }

    assertColor(color: Color)
    {
        expect(this.notification.getColor()).toBe(color);
    }
}

describe('NotificationBase', () =>
{
    const suite = new NotificationBaseTestingSuite();

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('properties', () =>
    {
        it('notification properties match provided data', () =>
        {
            suite.assertNotificationFieldsMatchData();
        });
    });

    describe('getColor', () =>
    {
        it('should return error color for Error notification type', () =>
        {
            suite.assertColor('error');
        });
    });

    describe('showToast', () =>
    {
        it('should call overlay.createToast with correct params', () =>
        {
            suite
                .createToast()
                .assertToastCreated()
                .assertToastDataMatchesNotificationData();
        });
    });
});
