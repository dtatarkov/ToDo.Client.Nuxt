export function awaitMicrotasks()
{
    return new Promise<void>(resolve =>
    {
        setTimeout(() => resolve(), 0);
    });
}