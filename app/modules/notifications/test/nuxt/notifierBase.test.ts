import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotifierBase } from '../../entities/notifierBase';
import type { NotifierRecord } from '../../entities/notifierRecord';
import { Icon } from '@/modules/shared/enums/icons';
import { overlayMock } from '@/modules/overlay/mocks/overlayMock';
import { notificationsTimelineMock } from '@/modules/uikit/mocks/notificationsTimelineMock';

describe('NotifierBase', () =>
{
    let notifier: NotifierBase;

    beforeEach(() =>
    {
        notifier = new NotifierBase(overlayMock, notificationsTimelineMock);

        vi.resetAllMocks();
    });

    describe('notify', () =>
    {
        it('should call overlay.createNotification with correct params', () =>
        {
            const record: NotifierRecord = {
                id: 'test-id',
                date: new Date('2024-01-01'),
                title: 'Test Title',
                description: 'Test Description',
                icon: Icon.exclamationTriangle,
                color: 'error',
            };

            notifier.notify(record);

            expect(overlayMock.createNotification).toHaveBeenCalledTimes(1);

            expect(overlayMock.createNotification).toHaveBeenCalledWith({
                id: record.id,
                title: record.title,
                description: record.description,
                icon: record.icon,
                color: record.color,
            });
        });

        it('should call notificationsTimeline.addRecord with correct params', () =>
        {
            const record: NotifierRecord = {
                id: 'test-id',
                date: new Date('2024-01-01'),
                title: 'Test Title',
                description: 'Test Description',
                icon: Icon.exclamationTriangle,
                color: 'error',
            };

            notifier.notify(record);

            expect(notificationsTimelineMock.addRecord).toHaveBeenCalledTimes(1);

            expect(notificationsTimelineMock.addRecord).toHaveBeenCalledWith({
                date: record.date,
                title: record.title,
                description: record.description,
                icon: record.icon,
            });
        });

        it('should work without optional id and color', () =>
        {
            const record: NotifierRecord = {
                date: new Date(),
                title: 'Test',
                description: '',
                icon: Icon.bellInactive,
            };

            notifier.notify(record);

            expect(overlayMock.createNotification).toHaveBeenCalledWith({
                id: undefined,
                title: record.title,
                description: record.description,
                icon: record.icon,
                color: undefined,
            });
        });
    });
});