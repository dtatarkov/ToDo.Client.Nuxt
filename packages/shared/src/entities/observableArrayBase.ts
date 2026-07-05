import { ObservableWritableBase } from './observableWritableBase';
import type { ObservableArray } from './observableArray';
import { removeFromArray } from '../utils/removeFromArray';

export class ObservableArrayBase<T> extends ObservableWritableBase<T[]> implements ObservableArray<T>
{
    constructor(defaultValue: T[] = [])
    {
        super([...defaultValue], { deferred: true });
    }

    add(element: T): void
    {
        this.value.push(element);
        this.notifySubscribers();
    }

    remove(element: T): boolean
    {
        const removed = removeFromArray(this.value, element);

        if (removed)
        {
            this.notifySubscribers();
        }

        return removed;
    }
}