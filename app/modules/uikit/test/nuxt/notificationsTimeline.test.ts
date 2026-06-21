import { describe, it, expect, beforeEach } from 'vitest';
import { Icon } from '@/modules/shared/enums/icons';
import { NotificationsTimelineBase } from '../../entities/notificationsTimelineBase';

describe('NotificationsTimeline', () =>
{
    let timeline: NotificationsTimelineBase;

    beforeEach(() =>
    {
        timeline = new NotificationsTimelineBase();
    });

    describe('addRecord', () =>
    {
        it('should add record to internal list', () =>
        {
            const record = {
                date: new Date(),
                title: 'Test',
                description: 'Description',
                icon: Icon.bellInactive
            };

            timeline.addRecord(record);

            expect(timeline.getRecords()).toContain(record);
        });
    });

    describe('getRecords', () =>
    {
        it('should return all added records', () =>
        {
            const record1 = {
                date: new Date(),
                title: 'Test 1',
                description: 'Description 1',
                icon: Icon.bellInactive
            };

            const record2 = {
                date: new Date(),
                title: 'Test 2',
                description: 'Description 2',
                icon: Icon.check
            };

            timeline.addRecord(record1);
            timeline.addRecord(record2);

            const records = timeline.getRecords();

            expect(records.length).toBe(2);
            expect(records).toContain(record1);
            expect(records).toContain(record2);
        });

        it('should return empty array when no records added', () =>
        {
            expect(timeline.getRecords()).toEqual([]);
        });
    });
});