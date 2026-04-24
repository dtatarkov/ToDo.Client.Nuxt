import { Container, type BindInWhenOnFluentSyntax } from "inversify";
import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { Constructor } from "../types/constructor";
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

abstract class ServiceRegistrationBuilder<T>
{
    abstract asScoped(): void;
    abstract asSingleton(): void;
    abstract asTransient(): void;
}

class ServiceRegistrationBuilderImpl<T> extends ServiceRegistrationBuilder<T>
{
    constructor(private binding: BindInWhenOnFluentSyntax<T>)
    {
        super();
    }

    override asScoped(): void
    {
        this.binding.inSingletonScope();
    }

    override asSingleton(): void
    {
        this.binding.inSingletonScope();
    }

    override asTransient(): void
    {
        this.binding.inTransientScope();
    }
}

export function getService<T>(serviceIdentifier: ServiceIdentifier<T>): T
{
    const container = getContainer();

    return container.get(serviceIdentifier);
}

export function registerService<T>(
    serviceIdentifier: ServiceIdentifier<T>,
    service: Constructor<T>
): ServiceRegistrationBuilder<T>
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

    const builder = new ServiceRegistrationBuilderImpl(binding);

    return builder;
}

export function registerServiceFactory<T>(
    serviceIdentifier: ServiceIdentifier<T>,
    factory: () => T
): ServiceRegistrationBuilder<T>
{
    const container = getContainer();
    const binding = container.bind(serviceIdentifier).toDynamicValue(factory);
    const builder = new ServiceRegistrationBuilderImpl(binding);

    return builder;
}