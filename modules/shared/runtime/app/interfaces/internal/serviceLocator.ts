export abstract class ServiceLocator
{
  abstract get<T>(serviceIdentifier: ServiceIdentifier<T>): T

  abstract register<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>, scope?: ServiceScope): void

  abstract registerFactory<T>(serviceIdentifier: ServiceIdentifier<T>, factory: () => T, scope?: ServiceScope): void
}