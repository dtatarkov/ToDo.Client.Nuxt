import { InputElementBase } from "./inputElementBase";
import { StringsService } from '@shared/interfaces/stringsService';

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