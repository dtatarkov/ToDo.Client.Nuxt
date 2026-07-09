import type { Constructor } from '@client/shared';
import type { AbstractConstructor } from '@client/shared';

export type ServiceIdentifier<T> = Constructor<T> | AbstractConstructor<T>;
