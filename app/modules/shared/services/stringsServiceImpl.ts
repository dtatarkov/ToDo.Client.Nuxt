import { StringsService } from "../interfaces/stringsService";

export class StringsServiceImpl extends StringsService
{
  isStringEmpty(str: string | null | undefined): boolean
  {
    if (!str)
    {
      return true;
    }

    const trimmedStr = str.trim();

    return trimmedStr.length === 0;
  }

  postfixNotEmpty(str: string, postfix: string, separator = '-'): string
  {
    if (this.isStringEmpty(str))
    {
      return str;
    }

    return str + separator + postfix;
  }
}