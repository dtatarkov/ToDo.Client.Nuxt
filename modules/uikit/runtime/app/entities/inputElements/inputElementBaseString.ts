import { InputElementBase } from "./inputElementBase";

export abstract class InputElementBaseString extends InputElementBase<string>
{
  constructor(
    stringsService: StringsService,
  )
  {
    super(stringsService);

    Object.assign(this.data, { modelValue: '' });
  }
}