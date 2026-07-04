import type { InputElementText } from '@/modules/forms/entities/inputElements/inputElementText';
import type { InputElementDate } from '@/modules/forms/entities/inputElements/InputElementDate';
import type { InputElementTime } from '@/modules/forms/entities/inputElements/inputElementTime';
import type { InputElementDateTime } from '@/modules/forms/entities/inputElements/inputElementDateTime';
import type { InputElementTextarea } from '../entities/inputElements/inputElementTextarea';

export abstract class InputElementsFactory
{
    abstract createInputText(): InputElementText;
    abstract createTextarea(): InputElementTextarea;
    abstract createInputDate(): InputElementDate;
    abstract createInputTime(): InputElementTime;
    abstract createInputDateTime(): InputElementDateTime;
}