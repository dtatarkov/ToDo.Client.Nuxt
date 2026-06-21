import type { NotifierRecord } from './notifierRecord';

export abstract class Notifier
{
    abstract notify(record: NotifierRecord): void;
}