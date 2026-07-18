import type { ServicesContainer } from '@client/infrastructure-di';
import { servicesContainerKey } from '../keys/servicesContainerKey';
import { provide } from 'vue';
import { useComponentData } from './useComponentData';

export function provideServicesContainer(container: ServicesContainer)
{
    const { setData } = useComponentData();

    provide(servicesContainerKey, container);
    setData(servicesContainerKey, container);
}