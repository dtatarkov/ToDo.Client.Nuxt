export abstract class ValueMapper<I, O>
{
  abstract map(value: I): O;

  abstract mapReverse(value: O): I;
}