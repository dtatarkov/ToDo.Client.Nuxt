import type { AbstractConstructor } from '../types/abstractConstructor';
import type { Constructor } from '../types/constructor';

/**
 * Symbol used as the property key for storing dependencies on a class.
 */
export const dependenciesSymbol = Symbol('dependencies');

type Dependency = Constructor<any> | AbstractConstructor<any>;

/**
 * Decorator that adds a single dependency to a class.
 * Dependencies are stored in a property keyed by `dependenciesSymbol`.
 * 
 * @param dependency - Constructor function representing the dependency.
 * @returns A class decorator that adds the dependency to the class's dependencies array.
 */
export function dependency<This, Args extends any[]>(dependency: Dependency)
{
    return function (target: new (...args: Args) => This, context: ClassDecoratorContext<new (...args: Args) => This>): new (...args: Args) => This
    {
        if (context.kind !== 'class')
        {
            throw new TypeError('@Dependency decorator can only be applied to a class.');
        }

        // Use addInitializer to run after class evaluation
        context.addInitializer(() =>
        {
            // Ensure the target has the dependencies property
            let dependencies = (target as any)[dependenciesSymbol] as Dependency[] | undefined;

            if (!dependencies)
            {
                // Define the property on the class (static property)
                Object.defineProperty(target, dependenciesSymbol, {
                    value: [],
                    writable: false,
                    enumerable: false,
                    configurable: false,
                });

                dependencies = (target as any)[dependenciesSymbol] as Constructor<any>[];
            }

            // we don't check for duplicates since binding depends on dependency index in target class constructor arguments
            dependencies.unshift(dependency);
        });

        // Return the original class
        return target;
    };
}

/**
 * Utility to retrieve dependencies from a class.
 * 
 * @param target - The class constructor or instance.
 * @returns Array of constructor dependencies, or empty array if none.
 */
export function getDependencies(target: Function | object): Constructor<any>[]
{
    const constructor = typeof target === 'function' ? target : target.constructor;
    return (constructor as any)[dependenciesSymbol] ?? [];
}