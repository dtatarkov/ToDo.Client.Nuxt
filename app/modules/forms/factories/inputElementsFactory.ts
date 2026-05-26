import type { InputTextViewmodel } from '@/modules/uikit/interfaces/inputTextViewmodel';
import type { InputTextareaViewmodel } from '@/modules/uikit/interfaces/inputTextareaViewmodel';
import type { InputDateViewmodel } from '@/modules/uikit/interfaces/inputDateViewmodel';
import type { InputTimeViewmodel } from '@/modules/uikit/interfaces/inputTimeViewmodel';
import type { InputDateTimeViewmodel } from '@/modules/uikit/interfaces/inputDateTimeViewmodel';

export abstract class InputElementsFactory
{
    abstract createInputText(): InputTextViewmodel;
    abstract createTextarea(): InputTextareaViewmodel;
    abstract createInputDate(): InputDateViewmodel;
    abstract createInputTime(): InputTimeViewmodel;
    abstract createInputDateTime(): InputDateTimeViewmodel;
}