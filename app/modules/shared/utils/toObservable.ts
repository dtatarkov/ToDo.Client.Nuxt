import { ObservableSource } from '../entities/observableSource';
import type { MaybeObservable } from '../interfaces/maybeObservable';
import type { Observable } from '../interfaces/observable';
import { isObservable } from './isObservable';

export function toObservable<T>(maybeObservable: MaybeObservable<T>): Observable<T>
{
    if (isObservable(maybeObservable))
    {
        return maybeObservable;
    }

    return new ObservableSource(maybeObservable);
}

