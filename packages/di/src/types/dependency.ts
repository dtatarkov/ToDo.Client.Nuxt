import type { AbstractConstructor } from '@client/shared';
import type { Constructor } from '@client/shared';

export type Dependency = Constructor<any> | AbstractConstructor<any>;
