import type { Constructor } from '@packages/shared';
import type { AbstractConstructor } from '@packages/shared';

export type ServiceIdentifier<T> = Constructor<T> | AbstractConstructor<T>;
