export abstract class StringsService
{
  abstract isStringEmpty(str: string | null | undefined): boolean;

  abstract postfixNotEmpty(str: string, postfix: string, separator?: string): string;
}