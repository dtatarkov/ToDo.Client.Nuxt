import type { ServiceIdentifier } from "../types/serviceIdentifier";
import { useNuxtApp } from "#imports";
import { ServicesContainer, type BindingBuilder } from '../entities/internal/servicesContainer';

const containerKey = "$ServicesContainer";

function getServicesContainer(): ServicesContainer
{
    const nuxtApp = useNuxtApp();

    if (!nuxtApp[containerKey])
    {
        nuxtApp[containerKey] = new ServicesContainer();
    }

    const container = nuxtApp[containerKey] as ServicesContainer;

    return container;
}

export function getService<T>(identifier: ServiceIdentifier<T>): T
{
    const container = getServicesContainer();

    return container.get(identifier);
}

export function registerService<T>(
    identifier: ServiceIdentifier<T>
): BindingBuilder<T>
{
    const container = getServicesContainer();
    const builder = container.bind(identifier);

    return builder;
}