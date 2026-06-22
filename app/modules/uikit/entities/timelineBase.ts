import { h } from 'vue';
import { Timeline } from './timeline';
import type { TimelineRecord } from '../types/timelineRecord';
import VTimeline from '../components/VTimeline.vue';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';

export abstract class TimelineBase extends Timeline
{
    protected records: TimelineRecord[] = [];
    private recordsChangeEvent = new EntityEvent();

    override addRecord(record: TimelineRecord): void
    {
        this.records.push(record);
        this.recordsChangeEvent.emit();
    }

    override getRecords(): TimelineRecord[]
    {
        return this.records;
    }

    override hasRecords(): boolean
    {
        return this.records.length > 0;
    }

    override onRecordsChange(callback: Action<[]>, disposeToken?: DisposeToken): void
    {
        this.recordsChangeEvent.on(callback, disposeToken);
    }

    override get vnode()
    {
        return h(VTimeline, { records: this.records });
    }

    override[Symbol.dispose](): void
    {
        this.recordsChangeEvent[Symbol.dispose]();
    }
}