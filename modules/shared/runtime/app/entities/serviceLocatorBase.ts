import { type BindInWhenOnFluentSyntax, Container } from "inversify";
import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { Constructor } from "../types/constructor";
import { ServiceScope } from "../enums/serviceScope";
import { ServiceLocator } from "../interfaces/serviceLocator";

export class ServiceLocatorBase extends ServiceLocator
{
  private container = new Container();

  get<T>(serviceIdentifier: ServiceIdentifier<T>): T
  {
    return this.container.get(serviceIdentifier);
  }

  register<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>, scope = ServiceScope.Request): void
  {
    const binding = this.container.bind(serviceIdentifier).to(service);
    this.applyScope(binding, scope);
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