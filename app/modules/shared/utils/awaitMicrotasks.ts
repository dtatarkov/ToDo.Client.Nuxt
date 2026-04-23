export function awaitMicrotasks()
{
    return new Promise<void>(resolve =>
    {
        resolve();
    });
}