export function removeFromArray<T>(array: T[], element: T): void
{
    const index = array.indexOf(element);

    if (index === -1)
    {
        return;
    }

    array.splice(index, 1);
}