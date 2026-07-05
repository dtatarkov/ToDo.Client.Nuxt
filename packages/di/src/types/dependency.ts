import type { AbstractConstructor } from '@packages/shared';
import type { Constructor } from '@packages/shared';

export type Dependency = Constructor<any> | AbstractConstructor<any>;
