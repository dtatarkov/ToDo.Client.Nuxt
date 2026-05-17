export abstract class StringsService
{
  abstract isStringEmpty(str: string | null | undefined): boolean;

  abstract postfixNotEmpty(str: string | undefined, postfix: string, separator?: string): string | undefined;
  abstract postfixNotEmpty(str: string, postfix: string, separator?: string): string;
}