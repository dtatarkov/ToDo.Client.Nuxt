import { useNuxtApp } from '#app';
import { ServicesContainer } from '../entities/internal/servicesContainer';

export const containerKey = "$ServicesContainer";

export function useServicesContainer(): ServicesContainer
{
    const nuxtApp = useNuxtApp();

    if (!nuxtApp[containerKey])
    {
        nuxtApp[containerKey] = new ServicesContainer();
    }

    const container = nuxtApp[containerKey] as ServicesContainer;

    return container;
}
