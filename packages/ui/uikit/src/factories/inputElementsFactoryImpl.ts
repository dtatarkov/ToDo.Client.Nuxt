import type { InputElementDate } from '../entities/inputElements/inputElementDate';
import { InputElementDateBase } from '../entities/inputElements/inputElementDateBase';
import type { InputElementDateTime } from '../entities/inputElements/inputElementDateTime';
import { InputElementDateTimeBase } from '../entities/inputElements/inputElementDateTimeBase';
import type { InputElementText } from '../entities/inputElements/inputElementText';
import type { InputElementTextarea } from '../entities/inputElements/inputElementTextarea';
import { InputElementTextareaBase } from '../entities/inputElements/inputElementTextareaBase';
import { InputElementTextBase } from '../entities/inputElements/InputElementTextBase';
import type { InputElementTime } from '../entities/inputElements/inputElementTime';
import { InputElementTimeBase } from '../entities/inputElements/inputElementTimeBase';
import { InputElementsFactory } from "./inputElementsFactory";

export class InputElementsFactoryImpl extends InputElementsFactory
{
    override createInputText(): InputElementText
    {
        return new InputElementTextBase();
    }

    override createTextarea(): InputElementTextarea
    {
        return new InputElementTextareaBase();
    }

    override createInputDate(): InputElementDate
    {
        return new InputElementDateBase();
    }

    override createInputTime(): InputElementTime
    {
        return new InputElementTimeBase();
    }

    override createInputDateTime(): InputElementDateTime
    {
        return new InputElementDateTimeBase();
    }
}