import { describe, it, expect, vi } from 'vitest';
import { TimelineBase } from '@/modules/notifications/entities/timelineBase';
import { appNotificationsStoreMock, createAppNotificationsStoreMock } from '@/modules/notifications/mocks/appNotificationsStoreMock';

describe('TimelineBase', () =>
{
    describe('isEmpty', () =>
    {
        it('should delegate to store isEmpty', () =>
        {
            const notificationsStoreMock = createAppNotificationsStoreMock(false);
            const timeline = new TimelineBase(notificationsStoreMock);

            expect(timeline.isEmpty).toBe(false);
        });

        it('should return true when store is empty', () =>
        {
            const notificationsStoreMock = createAppNotificationsStoreMock(true);
            const timeline = new TimelineBase(notificationsStoreMock);

            expect(timeline).toBe(true);
        });
    });

    describe('onEmptyStateChange', () =>
    {
        it('should delegate to store onEmptyStateChange', () =>
        {
            const timeline = new TimelineBase(appNotificationsStoreMock);
            const handler = vi.fn();
            timeline.onEmptyStateChange(handler);

            expect(appNotificationsStoreMock.onEmptyStateChange).toHaveBeenCalledWith(handler, undefined);
        });
    });
});