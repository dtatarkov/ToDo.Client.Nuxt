import { UIElement } from './uiElement';
import type { TimelineRecord } from '../types/timelineRecord';

export abstract class Timeline extends UIElement
{
    abstract addRecord(record: TimelineRecord): void;
    abstract getRecords(): TimelineRecord[];
}