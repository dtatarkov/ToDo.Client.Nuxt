import type { Observable } from './observable';

export type MaybeObservable<T> = T | Observable<T>; 