import type { InputElementDate } from '../entities/inputElements/inputElementDate';
import type { InputElementDateTime } from '../entities/inputElements/inputElementDateTime';
import type { InputElementText } from '../entities/inputElements/inputElementText';
import type { InputElementTextarea } from '../entities/inputElements/inputElementTextarea';
import type { InputElementTime } from '../entities/inputElements/inputElementTime';

export abstract class InputElementsFactory
{
    abstract createInputText(): InputElementText;
    abstract createTextarea(): InputElementTextarea;
    abstract createInputDate(): InputElementDate;
    abstract createInputTime(): InputElementTime;
    abstract createInputDateTime(): InputElementDateTime;
}