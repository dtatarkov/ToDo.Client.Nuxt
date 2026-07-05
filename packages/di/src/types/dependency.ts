import type { AbstractConstructor } from '@/modules/shared/types/abstractConstructor';
import type { Constructor } from '@/modules/shared/types/constructor';

export type Dependency = Constructor<any> | AbstractConstructor<any>;
