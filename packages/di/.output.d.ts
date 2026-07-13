declare module "src/types/serviceIdentifier" {
    import type { Constructor } from '@client/shared';
    import type { AbstractConstructor } from '@client/shared';
    export type ServiceIdentifier<T> = Constructor<T> | AbstractConstructor<T>;
}
declare module "src/types/dependency" {
    import type { AbstractConstructor } from '@client/shared';
    import type { Constructor } from '@client/shared';
    export type Dependency = Constructor<any> | AbstractConstructor<any>;
}
declare module "src/decorators/dependency" {
    import type { Constructor } from '@client/shared';
    import type { Dependency } from "src/types/dependency";
    /**
     * Symbol used as the property key for storing dependencies on a class.
     */
    export const dependenciesSymbol: unique symbol;
    /**
     * Decorator that adds a single dependency to a class.
     * Dependencies are stored in a property keyed by `dependenciesSymbol`.
     *
     * @param dependency - Constructor function representing the dependency.
     * @returns A class decorator that adds the dependency to the class's dependencies array.
     */
    export function dependency<This, Args extends any[]>(dependency: Dependency): (target: new (...args: Args) => This, context: ClassDecoratorContext<new (...args: Args) => This>) => new (...args: Args) => This;
    /**
     * Utility to retrieve dependencies from a class.
     *
     * @param target - The class constructor or instance.
     * @returns Array of constructor dependencies, or empty array if none.
     */
    export function getDependencies(target: Constructor<any>): Constructor<any>[];
}
declare module "src/entities/servicesContainer" {
    import type { ServiceIdentifier } from "src/types/serviceIdentifier";
    import { type Constructor } from '@client/shared';
    enum BindingScope {
        Transient = 0,
        Scoped = 1,
        Singleton = 2
    }
    interface ContainerSettings {
        defaultScope: BindingScope;
    }
    /**
     * Abstract scope for service resolution with hierarchical support.
     * Provides methods to get services, dispose the scope, and create child scopes.
     */
    export abstract class ServicesScope implements Disposable {
        /**
         * Get a service instance by its identifier.
         * @param identifier Service identifier
         * @returns Resolved service instance
         */
        abstract get<T>(identifier: ServiceIdentifier<T>): T;
        /**
         * Dispose this scope, clearing all scoped service instances.
         */
        abstract [Symbol.dispose](): void;
        /**
         * Create a child scope that can resolve services from this parent scope.
         * @returns New child scope
         */
        abstract createScope(): ServicesScope;
    }
    abstract class Binding<T> {
        protected settings: ContainerSettings;
        readonly identifier: ServiceIdentifier<T>;
        private bindingScopeInternal;
        constructor(settings: ContainerSettings, identifier: ServiceIdentifier<T>);
        get bindingScope(): BindingScope;
        setBindingScope(scope: BindingScope): void;
        abstract createInstance(servicesScope: ServicesScope): T;
    }
    export abstract class BindingBuilder<T> {
        abstract to(implementation: Constructor<T>): BindingScopeBuilder;
        abstract toDynamicValue(factory: () => T): BindingScopeBuilder;
    }
    class BindingBuilderImpl<T> extends BindingBuilder<T> {
        private bindings;
        private identifier;
        private settings;
        constructor(bindings: Map<ServiceIdentifier<any>, Binding<any>>, identifier: ServiceIdentifier<T>, settings: ContainerSettings);
        to(implementation: Constructor<T>): BindingScopeBuilder;
        toDynamicValue(factory: () => T): BindingScopeBuilder;
        private addBinding;
    }
    export abstract class BindingScopeBuilder {
        abstract asTransient(): void;
        abstract asScoped(): void;
        abstract asSingleton(): void;
    }
    export class ServicesContainer implements Disposable {
        private bindings;
        private settings;
        private rootScope;
        constructor(settings?: Partial<ContainerSettings>);
        bind<T>(identifier: ServiceIdentifier<T>): BindingBuilderImpl<T>;
        get<T>(identifier: ServiceIdentifier<T>): T;
        [Symbol.dispose](): void;
        createScope(): ServicesScope;
    }
}
declare module "src/index" {
    export type { ServiceIdentifier } from "src/types/serviceIdentifier";
    export { ServicesContainer, ServicesScope, BindingBuilder } from "src/entities/servicesContainer";
    export { dependency } from "src/decorators/dependency";
}
declare module "test/unit/servicesContainer.test" { }
