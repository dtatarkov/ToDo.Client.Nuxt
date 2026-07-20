export function isStringEmpty(str: string | null | undefined): str is '' | null | undefined
{
    if (!str)
    {
        return true;
    }

    const trimmedStr = str.trim();

    return trimmedStr.length === 0;
}