import { ServicesContainer } from '@client/di';

export const containerKey = "$ServicesContainer";

export function useServicesContainer(forceNew = false): ServicesContainer
{
    const nuxtApp = useNuxtApp();

    if (forceNew || !nuxtApp[containerKey])
    {
        nuxtApp[containerKey] = new ServicesContainer();
    }

    const container = nuxtApp[containerKey] as ServicesContainer;

    return container;
}
