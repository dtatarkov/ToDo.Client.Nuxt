import type { InputElementDate } from './InputElementDate';
import { InputElementBase } from './inputElementBase';

export class InputElementDateBase extends InputElementBase<Date | undefined> implements InputElementDate
{
    protected override getDefaultValue(): Date | undefined
    {
        return undefined;
    }
}