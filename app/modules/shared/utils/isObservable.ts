import type { MaybeObservable } from '../interfaces/maybeObservable';
import type { Observable } from '../interfaces/observable';


export function isObservable<T>(maybeObservable: MaybeObservable<T>): maybeObservable is Observable<T>
{
    return maybeObservable && typeof maybeObservable === 'object' && 'subscribe' in maybeObservable && 'value' in maybeObservable;
}
