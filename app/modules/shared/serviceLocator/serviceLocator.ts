import { Container } from "inversify";
import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { Constructor } from "../types/constructor";
import { ServiceScope } from "../enums/serviceScope";
import { getDependencies } from "../decorators/dependency";
import { useNuxtApp } from "#imports";

const containerKey = "$inversifyContainer";

function getContainer(): Container
{
    const nuxtApp = useNuxtApp();

    if (!nuxtApp[containerKey])
    {
        nuxtApp[containerKey] = new Container();
    }

    const container = nuxtApp[containerKey] as Container;

    return container;
}

function applyScope<T>(
    binding: any,
    scope: ServiceScope
): void
{
    switch (scope)
    {
        case ServiceScope.Request:
            binding.inRequestScope();
            break;
        case ServiceScope.Singleton:
            binding.inSingletonScope();
            break;
    }
}

export function getService<T>(serviceIdentifier: ServiceIdentifier<T>): T
{
    const container = getContainer();

    return container.get(serviceIdentifier);
}

export function registerService<T>(
    serviceIdentifier: ServiceIdentifier<T>,
    service: Constructor<T>,
    scope: ServiceScope = ServiceScope.Request
): void
{
    const container = getContainer();
    const dependencies = getDependencies(service);

    const binding = container.bind(serviceIdentifier).toDynamicValue(() =>
    {
        const resolvedDependencies = dependencies.map(dependency =>
            container.get(dependency)
        );
        return Reflect.construct(service, resolvedDependencies);
    });

    applyScope(binding, scope);
}

export function registerServiceFactory<T>(
    serviceIdentifier: ServiceIdentifier<T>,
    factory: () => T,
    scope: ServiceScope = ServiceScope.Request
): void
{
    const container = getContainer();
    const binding = container.bind(serviceIdentifier).toDynamicValue(factory);
    applyScope(binding, scope);
}