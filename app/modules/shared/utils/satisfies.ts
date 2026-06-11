export function satisfies<TConstraint extends Record<string, any>>(
    target: Record<string, any>,
    constraint: TConstraint
): boolean
{
    return (Object.keys(constraint) as (keyof TConstraint)[])
        .every(key => target[key as string] === constraint[key]);
}