import type { Constructor } from '@/modules/shared/types/constructor';
import type { AbstractConstructor } from '@/modules/shared/types/abstractConstructor';

export type ServiceIdentifier<T> = Constructor<T> | AbstractConstructor<T>;
