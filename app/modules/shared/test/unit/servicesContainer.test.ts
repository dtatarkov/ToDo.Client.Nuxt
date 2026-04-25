import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServicesContainer } from '../../entities/internal/servicesContainer';
import { Destroyable } from '../../interfaces/destroyable';

// Test interfaces
abstract class ServiceA { }
class ServiceAImpl implements ServiceA { }

describe('ServicesContainer', () =>
{
    let container: ServicesContainer;

    beforeEach(() =>
    {
        container = new ServicesContainer();
    });

    describe('binding and resolution', () =>
    {
        it('should bind and resolve a singleton service', () =>
        {
            container.bind(ServiceA).to(ServiceAImpl).asSingleton();

            const instance1 = container.get(ServiceA);
            const instance2 = container.get(ServiceA);

            expect(instance1).toBeInstanceOf(ServiceAImpl);
            expect(instance2).toBe(instance1); // same instance
        });

        it('should bind and resolve a scoped service', () =>
        {
            container.bind(ServiceA).to(ServiceAImpl).asScoped();

            const instance1 = container.get(ServiceA);
            const instance2 = container.get(ServiceA);

            expect(instance1).toBeInstanceOf(ServiceAImpl);
            expect(instance2).toBe(instance1); // same instance within same scope (root)
        });

        it('should bind and resolve a transient service', () =>
        {
            container.bind(ServiceA).to(ServiceAImpl).asTransient();

            const instance1 = container.get(ServiceA);
            const instance2 = container.get(ServiceA);

            expect(instance1).toBeInstanceOf(ServiceAImpl);
            expect(instance2).toBeInstanceOf(ServiceAImpl);
            expect(instance2).not.toBe(instance1); // different instances
        });

        it('should bind to dynamic value', () =>
        {
            const customInstance = new ServiceAImpl();
            container.bind(ServiceA).toDynamicValue(() => customInstance).asSingleton();

            const instance = container.get(ServiceA);
            expect(instance).toBe(customInstance);
        });

        it('should throw when no binding found', () =>
        {
            expect(() => container.get(ServiceA)).toThrow('No binding found');
        });

        it('should throw on duplicate binding', () =>
        {
            container.bind(ServiceA).to(ServiceAImpl);
            expect(() => container.bind(ServiceA).to(ServiceAImpl)).toThrow('Duplicate binding');
        });
    });

    describe('scopes', () =>
    {
        it('should create child scope', () =>
        {
            container.bind(ServiceA).to(ServiceAImpl).asScoped();

            const childScope1 = container.createScope();
            const childScope2 = container.createScope();
            const childInstance1 = childScope1.get(ServiceA);
            const childInstance2 = childScope2.get(ServiceA);

            expect(childInstance1).toBeInstanceOf(ServiceAImpl);
            expect(childInstance2).toBeInstanceOf(ServiceAImpl);
            expect(childInstance1).not.toBe(childInstance2); //different scopes
        });

        it('should resolve singleton from root scope in child scope', () =>
        {
            container.bind(ServiceA).to(ServiceAImpl).asSingleton();
            const childScope = container.createScope();

            const rootInstance = container.get(ServiceA);
            const childInstance = childScope.get(ServiceA);

            expect(childInstance).toBe(rootInstance); // same singleton instance
        });

        it('should destroy child scope and clear its instances', () =>
        {
            const destroyableInstance = {
                destroy: vi.fn(),
            };

            container.bind(ServiceA).toDynamicValue(() => destroyableInstance).asScoped();

            const childScope = container.createScope();

            childScope.get(ServiceA);
            childScope.destroy();

            expect(destroyableInstance.destroy).toHaveBeenCalledOnce();
            expect(() => childScope.get(ServiceA)).toThrow();
        });
    });

    describe('destroy', () =>
    {
        it('should destroy scope', () =>
        {
            container.bind(ServiceA).to(ServiceAImpl).asScoped();

            const childScope = container.createScope();
            childScope.destroy();

            expect(() => childScope.get(ServiceA)).toThrow();
        });

        it('should destroy transient services', () =>
        {
            const destroyFn = vi.fn();

            container.bind(ServiceA).toDynamicValue(() => ({ destroy: destroyFn })).asTransient();

            const childScope = container.createScope();

            childScope.get(ServiceA);
            childScope.destroy();

            expect(destroyFn).toHaveBeenCalledOnce();
        });

        it('should destroy scoped services', () =>
        {
            const destroyFn = vi.fn();

            container.bind(ServiceA).toDynamicValue(() => ({ destroy: destroyFn })).asScoped();

            const childScope = container.createScope();

            childScope.get(ServiceA);
            childScope.destroy();

            expect(destroyFn).toHaveBeenCalledOnce();
        });

        it('should not destroy singleton services', () =>
        {
            const destroyFn = vi.fn();

            container.bind(ServiceA).toDynamicValue(() => ({ destroy: destroyFn })).asSingleton();

            const childScope = container.createScope();

            childScope.get(ServiceA);
            childScope.destroy();

            expect(destroyFn).not.toHaveBeenCalled();
        });
    });
});