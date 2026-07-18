import type { ServicesContainer } from '@client/infrastructure-di';
import type { InjectionKey } from 'vue';

export const servicesContainerKey: InjectionKey<ServicesContainer> = Symbol('ServicesContainer');