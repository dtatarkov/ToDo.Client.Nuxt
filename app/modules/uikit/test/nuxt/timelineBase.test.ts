import { describe, it, expect, beforeEach } from 'vitest';
import { Icon } from '@/modules/shared/enums/icons';
import { TimelineBase } from '@/modules/notifications/entities/timelineBase';
import { appNotificationMock, createAppNotificationMock } from '@/modules/notifications/mocks/appNotificationMock';

describe('TimelineBase', () =>
{
    let timeline: TimelineBase;

    beforeEach(() =>
    {
        timeline = new TimelineBase();
    });

    describe('addRecord', () =>
    {
        it('should add record to internal list', () =>
        {
            timeline.addNotification(appNotificationMock);

            expect(timeline.getNotifications()).toContain(appNotificationMock);
        });
    });

    describe('getRecords', () =>
    {
        it('should return all added records', () =>
        {
            const notification1Mock = createAppNotificationMock({
                date: new Date(),
                title: 'Test 1',
                description: 'Description 1',
                icon: Icon.bellInactive
            });

            const notificationMock2 = createAppNotificationMock({
                date: new Date(),
                title: 'Test 2',
                description: 'Description 2',
                icon: Icon.check
            });

            timeline.addNotification(notification1Mock);
            timeline.addNotification(notificationMock2);

            const records = timeline.getNotifications();

            expect(records.length).toBe(2);
            expect(records).toContain(notification1Mock);
            expect(records).toContain(notificationMock2);
        });

        it('should return empty array when no records added', () =>
        {
            expect(timeline.getNotifications()).toEqual([]);
        });
    });
});