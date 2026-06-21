import { h } from 'vue';
import { Timeline } from './timeline';
import type { TimelineRecord } from '../types/timelineRecord';
import VTimeline from '../components/VTimeline.vue';

export abstract class TimelineBase extends Timeline
{
    protected records: TimelineRecord[] = [];

    override addRecord(record: TimelineRecord): void
    {
        this.records.push(record);
    }

    override getRecords(): TimelineRecord[]
    {
        return this.records;
    }

    override get vnode()
    {
        return h(VTimeline, { records: this.records });
    }

    override[Symbol.dispose](): void
    {
        // no cleanup needed
    }
}