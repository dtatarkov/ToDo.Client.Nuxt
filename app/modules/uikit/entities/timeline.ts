import { UIElement } from './uiElement';
import type { TimelineRecord } from '../types/timelineRecord';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';

export abstract class Timeline extends UIElement
{
    abstract addRecord(record: TimelineRecord): void;
    abstract getRecords(): TimelineRecord[];

    abstract hasRecords(): boolean;
    abstract onRecordsChange(callback: Action<[]>, disposeToken?: DisposeToken): void;
}