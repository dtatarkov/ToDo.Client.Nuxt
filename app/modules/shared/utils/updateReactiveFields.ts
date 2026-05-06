import { ReactiveField } from '@/modules/shared/interfaces/reactiveField';
import type { ValueOrGetter } from '../types/valueOrGetter';

// Type that extracts only the keys from T that are instances of ReactiveFieldVue
type ReactiveFieldKeys<T> = {
  [K in keyof T]: T[K] extends ReactiveField<any> ? K : never;
}[keyof T];

// Type for data parameter that only includes reactive field properties
type ReactiveFields<T> = {
  [K in ReactiveFieldKeys<T>]?: T[K] extends ReactiveField<infer V> ? ValueOrGetter<V> : never;
};

/**
 * Updates properties in an object that are instances of ReactiveFieldVue with values from data
 * @param object - The object containing ReactiveFieldVue properties
 * @param data - Object containing only reactive field key-value pairs to update
 */
export function updateReactiveFields<T extends Record<string, any>>(object: T, data: ReactiveFields<T>): void
{
  for (const [key, value] of Object.entries(data))
  {
    const objectKey = key as keyof T;
    const prop = object[objectKey];

    if ((prop as any) instanceof ReactiveField)
    {
      (prop as ReactiveField<any>).value = value;
    }
  }
}