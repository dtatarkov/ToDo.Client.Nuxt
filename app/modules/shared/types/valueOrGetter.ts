import type { Func } from './func';

export type ValueOrGetter<T> = T | Func<T>;