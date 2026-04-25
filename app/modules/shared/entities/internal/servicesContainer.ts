import type { ServiceIdentifier } from "../../types/serviceIdentifier";
import type { Constructor } from "../../types/constructor";
import { getDependencies } from "../../decorators/dependency";
import { Destroyable } from '../../interfaces/destroyable';

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

type ServicesScopeLookupResult<T> = {
    value: T | undefined;
    hasValue: boolean;
};

/**
 * Abstract scope for service resolution with hierarchical support.
 * Provides methods to get services, destroy the scope, and create child scopes.
 */
export abstract class ServicesScope
{
    /**
     * Get a service instance by its identifier.
     * @param identifier Service identifier
     * @returns Resolved service instance
     */
    abstract get<T>(identifier: ServiceIdentifier<T>): T;

    abstract lookup<T>(identifier: ServiceIdentifier<T>): ServicesScopeLookupResult<T>;

    /**
     * Destroy this scope, clearing all scoped service instances.
     */
    abstract destroy(): void;

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
export class ServicesScopeImpl extends ServicesScope
{
    private instancesMap = new Map<ServiceIdentifier<any>, any>();
    private destroyables = new Set<Destroyable>();
    private isDestroyed = false;

    constructor(
        private bindings: Map<ServiceIdentifier<any>, Binding<any>>,
        private parent?: ServicesScope,
    )
    {
        super();
    }

    override lookup<T>(identifier: ServiceIdentifier<T>): ServicesScopeLookupResult<T>
    {
        this.assertNotDestroyed();

        let result: ServicesScopeLookupResult<T>;

        if (this.instancesMap.has(identifier))
        {
            result = {
                value: this.instancesMap.get(identifier),
                hasValue: true,
            };
        }
        else if (this.parent != undefined)
        {
            result = this.parent.lookup(identifier);
        }
        else 
        {
            result = { value: undefined, hasValue: false };
        }

        return result;
    }

    override get<T>(identifier: ServiceIdentifier<T>): T
    {
        this.assertNotDestroyed();

        const binding = this.bindings.get(identifier);

        if (!binding)
        {
            throw new Error(`No binding found for ${identifier.name || identifier}`);
        }

        const instance = this.resolveBinding(binding);

        return instance;
    }

    override destroy(): void
    {
        if (this.isDestroyed)
        {
            return;
        }

        for (const instance of this.destroyables)
        {
            instance.destroy();
        }

        this.instancesMap.clear();
        this.isDestroyed = true;
    }

    override createScope(): ServicesScope
    {
        this.assertNotDestroyed();

        const scope = new ServicesScopeImpl(this.bindings, this);

        return scope;
    }

    private assertNotDestroyed()
    {
        if (this.isDestroyed)
        {
            throw new Error('Cannot create child scope from destroyed scope');
        }
    }

    private resolveBinding<T>(binding: Binding<T>)
    {
        let instance: T;

        // Determine scope and resolve accordingly
        switch (binding.scope)
        {
            case BindingScope.Singleton:
                instance = this.resolveSingleton(binding);
            case BindingScope.Scoped:
                instance = this.resolveScoped(binding);
            case BindingScope.Transient:
                instance = this.resolveTransient(binding);
            default:
                throw new Error(`Unknown binding scope for ${binding.identifier.name || binding.identifier}`);
        }

        return instance;
    }

    private createBindingInstance<T>(binding: Binding<T>)
    {
        const instance = binding.createInstance();

        if (Destroyable.isDestroyable(instance))
        {
            this.destroyables.add(instance);
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

        // Not found in current scope, ask parent if exists
        if (this.parent)
        {
            const { value, hasValue } = this.parent.lookup(binding.identifier);

            if (hasValue)
            {
                return value as T;
            }
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
    private _scope: BindingScope | undefined;

    constructor(
        protected settings: ContainerSettings,
        public readonly identifier: ServiceIdentifier<T>
    ) { }

    get scope(): BindingScope
    {
        return this._scope ?? this.settings.defaultScope;
    }

    setScope(scope: BindingScope): void
    {
        if (this._scope !== undefined)
        {
            throw new Error('Scope already set');
        }

        this._scope = scope;
    }

    abstract createInstance(): T;
}

class ConstructorBinding<T> extends Binding<T>
{
    constructor(
        settings: ContainerSettings,
        identifier: ServiceIdentifier<T>,
        private container: ServicesContainer,
        private constructorFn: Constructor<T>
    )
    {
        super(settings, identifier);
    }

    createInstance(): T
    {
        const dependencies = getDependencies(this.constructorFn);

        const resolvedDependencies = dependencies.map(dep =>
            this.container.get(dep));

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

export class BindingBuilder<T>
{
    constructor(
        private bindings: Map<ServiceIdentifier<any>, Binding<any>>,
        private identifier: ServiceIdentifier<T>,
        private container: ServicesContainer,
        private settings: ContainerSettings
    ) { }

    to(implementation: Constructor<T>): BindingScopeBuilder<T>
    {
        const binding = new ConstructorBinding(this.settings, this.identifier, this.container, implementation);
        const builder = this.addBinding(binding);

        return builder;
    }

    toDynamicValue(factory: () => T): BindingScopeBuilder<T>
    {
        const binding = new FactoryBinding(this.settings, this.identifier, factory);
        const builder = this.addBinding(binding);

        return builder;
    }

    private addBinding(binding: Binding<T>): BindingScopeBuilder<T>
    {
        if (this.bindings.has(this.identifier))
        {
            throw new Error(`Duplicate binding for ${this.identifier.name || this.identifier}`);
        }

        this.bindings.set(this.identifier, binding);

        const builder = new BindingScopeBuilder(binding);

        return builder;
    }
}

export class BindingScopeBuilder<T>
{
    constructor(
        private binding: Binding<T>
    ) { }

    asTransient(): void
    {
        this.binding.setScope(BindingScope.Transient);
    }

    asScoped(): void
    {
        this.binding.setScope(BindingScope.Scoped);
    }

    asSingleton(): void
    {
        this.binding.setScope(BindingScope.Singleton);
    }
}

export class ServicesContainer
{
    private bindings = new Map<ServiceIdentifier<any>, Binding<any>>();
    private settings: ContainerSettings;
    private rootScope: ServicesScopeImpl;

    constructor(settings?: Partial<ContainerSettings>)
    {
        this.settings = { ...defaultContainerSettings, ...settings };
        this.rootScope = new ServicesScopeImpl(this.bindings);
    }

    bind<T>(identifier: ServiceIdentifier<T>): BindingBuilder<T>
    {
        return new BindingBuilder(this.bindings, identifier, this, this.settings);
    }

    get<T>(identifier: ServiceIdentifier<T>): T
    {
        return this.rootScope.get(identifier);
    }

    destroy(): void
    {
        this.rootScope.destroy();
    }

    createScope(): ServicesScope
    {
        return this.rootScope.createScope();
    }
}