import { InputElementsFactory } from "./inputElementsFactory";
import { InputElementTextBase } from "@/modules/forms/entities/inputElements/InputElementTextBase";
import { InputElementTextareaBase } from "@/modules/forms/entities/inputElements/inputElementTextareaBase";
import { InputElementDateBase } from "@/modules/forms/entities/inputElements/inputElementDateBase";
import { InputElementTimeBase } from "@/modules/forms/entities/inputElements/inputElementTimeBase";
import { InputElementDateTimeBase } from "@/modules/forms/entities/inputElements/inputElementDateTimeBase";
import type { InputElementText } from "@/modules/forms/entities/inputElements/inputElementText";
import type { InputElementTextarea } from "@/modules/forms/entities/inputElements/inputElementTextarea";
import type { InputElementDate } from "@/modules/forms/entities/inputElements/InputElementDate";
import type { InputElementTime } from "@/modules/forms/entities/inputElements/inputElementTime";
import type { InputElementDateTime } from "@/modules/forms/entities/inputElements/inputElementDateTime";

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