import type { InputTextViewmodel } from '@/modules/forms/entities/inputElements/inputTextViewmodel';
import type { InputTextareaViewmodel } from '@/modules/forms/entities/inputElements/inputTextareaViewmodel';
import type { InputDateViewmodel } from '@/modules/forms/entities/inputElements/inputDateViewmodel';
import type { InputTimeViewmodel } from '@/modules/forms/entities/inputElements/inputTimeViewmodel';
import type { InputDateTimeViewmodel } from '@/modules/forms/entities/inputElements/inputDateTimeViewmodel';

export abstract class InputElementsFactory
{
    abstract createInputText(): InputTextViewmodel;
    abstract createTextarea(): InputTextareaViewmodel;
    abstract createInputDate(): InputDateViewmodel;
    abstract createInputTime(): InputTimeViewmodel;
    abstract createInputDateTime(): InputDateTimeViewmodel;
}