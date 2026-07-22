export function delay(ms = 0): Promise<void>
{
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}