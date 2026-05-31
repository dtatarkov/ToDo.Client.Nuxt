import { isStringEmpty } from './isStringEmpty';

export function postfixNotEmptyString(str: string | undefined, postfix: string, separator?: string): string | undefined;
export function postfixNotEmptyString(str: string, postfix: string, separator?: string): string;
export function postfixNotEmptyString(str: string | undefined, postfix: string, separator = '-'): string | undefined
{
    if (isStringEmpty(str))
    {
        return str;
    }

    return str + separator + postfix;
}