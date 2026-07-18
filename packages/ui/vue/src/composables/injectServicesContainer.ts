import { ServicesContainer } from '@client/infrastructure-di';
import { servicesContainerKey } from '../keys/servicesContainerKey';
import { inject } from 'vue';
import { ContainerNotFoundException } from '@client/infrastructure-di';
import { useComponentData } from './useComponentData';

export const containerKey = "$ServicesContainer";

export function injectServicesContainer(): ServicesContainer
{
    const { getData } = useComponentData();

    let container = getData(servicesContainerKey);

    if (container == undefined)
    {
        container = inject(servicesContainerKey);
    }

    if (container == undefined)
    {
        throw new ContainerNotFoundException();
    }

    return container;
}
