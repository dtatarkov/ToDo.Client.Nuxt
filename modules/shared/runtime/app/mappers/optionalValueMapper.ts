import { ValueMapper } from "../interfaces/valueMapper";

export class OptionalValueMapper<I, O> extends ValueMapper<I | undefined, O | undefined>
{
  constructor(private valueMapper: ValueMapper<I, O>)
  {
    super();
  }

  map(value: I | undefined): O | undefined
  {
    if (value == undefined)
    {
      return undefined;
    }

    let result = this.valueMapper.map(value);

    return result;
  }

  mapReverse(value: O | undefined): I | undefined
  {
    if (value == undefined)
    {
      return undefined;
    }

    let result = this.valueMapper.mapReverse(value);

    return result;
  }
}