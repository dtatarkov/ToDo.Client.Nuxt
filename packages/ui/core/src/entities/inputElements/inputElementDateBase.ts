import type { InputElementDate } from './inputElementDate';
import { InputElementBase } from './inputElementBase';

export class InputElementDateBase extends InputElementBase<Date | undefined> implements InputElementDate
{
    protected override getDefaultValue(): Date | undefined
    {
        return undefined;
    }
}