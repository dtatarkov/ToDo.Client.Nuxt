import type { InputElementDate } from './InputElementDate';
import { InputElementBase } from './inputElementBase';
import VInputDate from '@/modules/uikit/components/VInputDate.vue';

export class InputElementDateBase extends InputElementBase<Date | undefined> implements InputElementDate
{
    protected component = VInputDate;

    protected override getDefaultValue(): Date | undefined
    {
        return undefined;
    }
}