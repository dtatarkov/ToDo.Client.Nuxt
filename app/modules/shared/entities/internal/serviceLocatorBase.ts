import { type BindInWhenOnFluentSyntax, Container } from "inversify";
import type { ServiceIdentifier } from "../../types/serviceIdentifier";
import type { Constructor } from "../../types/constructor";
import { ServiceScope } from "../../enums/serviceScope";
import { ServiceLocator } from "../../interfaces/internal/serviceLocator";
import { getDependencies } from "../../decorators/dependency";

export class ServiceLocatorBase extends ServiceLocator
{
  private container = new Container();

  get<T>(serviceIdentifier: ServiceIdentifier<T>): T
  {
    return this.container.get(serviceIdentifier);
  }

  register<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>, scope = ServiceScope.Request): void
  {
    const dependencies = getDependencies(service);

    if (dependencies.length > 0)
    {
      const binding = this.container.bind(serviceIdentifier).toDynamicValue(() =>
      {
        const resolvedDependencies = dependencies.map(dep =>
          this.container.get(dep));

        return Reflect.construct(service, resolvedDependencies);
      });

      this.applyScope(binding, scope);
    }
    else
    {
      const binding = this.container.bind(serviceIdentifier).to(service);
      this.applyScope(binding, scope);
    }
  }

  registerFactory<T>(serviceIdentifier: ServiceIdentifier<T>, factory: () => T, scope = ServiceScope.Request): void
  {
    const binding = this.container.bind(serviceIdentifier).toDynamicValue(factory);
    this.applyScope(binding, scope);
  }

  private applyScope<T>(binding: BindInWhenOnFluentSyntax<T>, scope: ServiceScope)
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
}