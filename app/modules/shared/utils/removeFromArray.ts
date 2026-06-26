export function removeFromArray<T>(array: T[], element: T): boolean
{
    const index = array.indexOf(element);

    if (index === -1)
    {
        return false;
    }

    array.splice(index, 1);
    return true;
}