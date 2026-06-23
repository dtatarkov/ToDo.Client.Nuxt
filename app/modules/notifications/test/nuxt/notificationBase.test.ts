import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppNotificationBase } from '../../entities/appNotificationBase';
import { Icon } from '@/modules/shared/enums/icons';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import type { AppNotificationData } from '../../types/appNotificationData';

describe('NotificationBase', () =>
{
    const notificationData: AppNotificationData = {
        date: new Date('2024-01-01'),
        title: 'Test Title',
        description: 'Test Description',
        icon: Icon.exclamationTriangle,
    };

    let notification: AppNotificationBase;

    beforeEach(() =>
    {
        vi.resetAllMocks();

        notification = new AppNotificationBase(
            overlayMock,
            notificationData,
        );
    });

    describe('properties', () =>
    {
        it('should return date from constructor data', () =>
        {
            expect(notification.date).toEqual(notificationData.date);
        });

        it('should return title from constructor data', () =>
        {
            expect(notification.title).toBe(notificationData.title);
        });

        it('should return description from constructor data', () =>
        {
            expect(notification.description).toBe(notificationData.description);
        });

        it('should return icon from constructor data', () =>
        {
            expect(notification.icon).toBe(notificationData.icon);
        });
    });

    describe('showToast', () =>
    {
        it('should call overlay.createNotification with correct params', () =>
        {
            notification.showToast();

            expect(overlayMock.createToast).toHaveBeenCalledTimes(1);

            expect(overlayMock.createToast).toHaveBeenCalledWith({
                title: notificationData.title,
                description: notificationData.description,
                icon: notificationData.icon,
                color: 'error',
            });
        });
    });
});