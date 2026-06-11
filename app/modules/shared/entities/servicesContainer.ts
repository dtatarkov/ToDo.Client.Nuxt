import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { Constructor } from "../types/constructor";
import { getDependencies } from "../decorators/dependency";
import { isDisposable } from "../utils/isDisposable";

enum BindingScope
{
    Transient = 0,
    Scoped = 1,
    Singleton = 2
}

interface ContainerSettings
{
    defaultScope: BindingScope;
}

const defaultContainerSettings: ContainerSettings = {
    defaultScope: BindingScope.Scoped
};

/**
 * Abstract scope for service resolution with hierarchical support.
 * Provides methods to get services, dispose the scope, and create child scopes.
 */
export abstract class ServicesScope implements Disposable
{
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

/**
 * Concrete implementation of ServicesScope for hierarchical service resolution.
 * Stores scoped service instances and delegates to parent for binding resolution.
 */
class ServicesScopeImpl extends ServicesScope
{
    private instancesMap = new Map<ServiceIdentifier<any>, any>();
    private disposables = new Set<Disposable>();
    private isDisposed = false;

    constructor(
        private bindings: Map<ServiceIdentifier<any>, Binding<any>>,
        private parent?: ServicesScope,
    )
    {
        super();
    }

    override get<T>(identifier: ServiceIdentifier<T>): T
    {
        this.assertNotDisposed();

        const binding = this.bindings.get(identifier);

        if (!binding)
        {
            throw new Error(`No binding found for ${identifier.name || identifier}`);
        }

        const instance = this.resolveBinding(binding);

        return instance;
    }

    override[Symbol.dispose](): void
    {
        if (this.isDisposed)
        {
            return;
        }

        for (const instance of this.disposables)
        {
            instance[Symbol.dispose]();
        }

        this.instancesMap.clear();
        this.isDisposed = true;
    }

    override createScope(): ServicesScope
    {
        this.assertNotDisposed();

        const scope = new ServicesScopeImpl(this.bindings, this);

        return scope;
    }

    private assertNotDisposed()
    {
        if (this.isDisposed)
        {
            throw new Error('Cannot create child scope from disposed scope');
        }
    }

    private resolveBinding<T>(binding: Binding<T>)
    {
        let instance: T;

        // Determine scope and resolve accordingly
        switch (binding.bindingScope)
        {
            case BindingScope.Singleton:
                instance = this.resolveSingleton(binding);
                break;

            case BindingScope.Scoped:
                instance = this.resolveScoped(binding);
                break;

            case BindingScope.Transient:
                instance = this.resolveTransient(binding);
                break;

            default:
                throw new Error(`Unknown binding scope for ${binding.identifier.name || binding.identifier}`);
        }

        return instance;
    }

    private createBindingInstance<T>(binding: Binding<T>)
    {
        const instance = binding.createInstance(this);

        if (isDisposable(instance))
        {
            this.disposables.add(instance);
        }

        return instance;
    }

    private resolveSingleton<T>(binding: Binding<T>): T
    {
        let instance: T;

        // Singleton resolution must happen at root scope
        if (this.parent == undefined)
        {
            if (!this.instancesMap.has(binding.identifier))
            {
                instance = this.createBindingInstance(binding);
                this.instancesMap.set(binding.identifier, instance);
            }

            instance = this.instancesMap.get(binding.identifier) as T;
        }
        else
        {
            instance = this.parent.get(binding.identifier);
        }

        return instance;
    }

    private resolveScoped<T>(binding: Binding<T>): T
    {
        // Check current scope's scoped instances
        if (this.instancesMap.has(binding.identifier))
        {
            const instance = this.instancesMap.get(binding.identifier) as T;

            return instance;
        }

        // Create new instance and store in current scope
        const instance = this.createBindingInstance(binding);
        this.instancesMap.set(binding.identifier, instance);

        return instance;
    }

    private resolveTransient<T>(binding: Binding<T>): T
    {
        // Transient always creates new instance, no caching
        const instance = this.createBindingInstance(binding);

        return instance;
    }
}

abstract class Binding<T>
{
    private bindingScopeInternal: BindingScope | undefined;

    constructor(
        protected settings: ContainerSettings,
        public readonly identifier: ServiceIdentifier<T>
    ) { }

    get bindingScope(): BindingScope
    {
        return this.bindingScopeInternal ?? this.settings.defaultScope;
    }

    setBindingScope(scope: BindingScope): void
    {
        if (this.bindingScopeInternal !== undefined)
        {
            throw new Error('Scope already set');
        }

        this.bindingScopeInternal = scope;
    }

    abstract createInstance(servicesScope: ServicesScope): T;
}

class ConstructorBinding<T> extends Binding<T>
{
    constructor(
        settings: ContainerSettings,
        identifier: ServiceIdentifier<T>,
        private constructorFn: Constructor<T>
    )
    {
        super(settings, identifier);
    }

    createInstance(servicesScope: ServicesScope): T
    {
        const dependencies = getDependencies(this.constructorFn);

        const resolvedDependencies = dependencies.map(dep =>
            servicesScope.get(dep));

        const instance = Reflect.construct(this.constructorFn, resolvedDependencies);

        return instance;
    }
}

class FactoryBinding<T> extends Binding<T>
{
    constructor(
        settings: ContainerSettings,
        identifier: ServiceIdentifier<T>,
        private factory: () => T
    )
    {
        super(settings, identifier);
    }

    createInstance(): T
    {
        return this.factory();
    }
}

export abstract class BindingBuilder<T>
{
    abstract to(implementation: Constructor<T>): BindingScopeBuilder;
    abstract toDynamicValue(factory: () => T): BindingScopeBuilder;
}

class BindingBuilderImpl<T> extends BindingBuilder<T>
{
    constructor(
        private bindings: Map<ServiceIdentifier<any>, Binding<any>>,
        private identifier: ServiceIdentifier<T>,
        private settings: ContainerSettings
    )
    {
        super();
    }

    override to(implementation: Constructor<T>): BindingScopeBuilder
    {
        const binding = new ConstructorBinding(this.settings, this.identifier, implementation);
        const builder = this.addBinding(binding);

        return builder;
    }

    override toDynamicValue(factory: () => T): BindingScopeBuilder
    {
        const binding = new FactoryBinding(this.settings, this.identifier, factory);
        const builder = this.addBinding(binding);

        return builder;
    }

    private addBinding(binding: Binding<T>): BindingScopeBuilder
    {
        if (this.bindings.has(this.identifier))
        {
            throw new Error(`Duplicate binding for ${this.identifier.name || this.identifier}`);
        }

        this.bindings.set(this.identifier, binding);

        const builder = new BindingScopeBuilderImpl(binding);

        return builder;
    }
}

export abstract class BindingScopeBuilder
{
    abstract asTransient(): void;
    abstract asScoped(): void;
    abstract asSingleton(): void;
}

class BindingScopeBuilderImpl<T> extends BindingScopeBuilder
{
    constructor(
        private binding: Binding<T>
    )
    {
        super();
    }

    override asTransient(): void
    {
        this.binding.setBindingScope(BindingScope.Transient);
    }

    override asScoped(): void
    {
        this.binding.setBindingScope(BindingScope.Scoped);
    }

    override asSingleton(): void
    {
        this.binding.setBindingScope(BindingScope.Singleton);
    }
}

export class ServicesContainer implements Disposable
{
    private bindings = new Map<ServiceIdentifier<any>, Binding<any>>();
    private settings: ContainerSettings;
    private rootScope: ServicesScopeImpl;

    constructor(settings?: Partial<ContainerSettings>)
    {
        this.settings = { ...defaultContainerSettings, ...settings };
        this.rootScope = new ServicesScopeImpl(this.bindings);
    }

    bind<T>(identifier: ServiceIdentifier<T>): BindingBuilderImpl<T>
    {
        return new BindingBuilderImpl(this.bindings, identifier, this.settings);
    }

    get<T>(identifier: ServiceIdentifier<T>): T
    {
        return this.rootScope.get(identifier);
    }

    [Symbol.dispose](): void
    {
        this.rootScope[Symbol.dispose]();
    }

    createScope(): ServicesScope
    {
        return this.rootScope.createScope();
    }
}