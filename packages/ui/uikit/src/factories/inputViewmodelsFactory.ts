import type { InputTextViewmodel } from '../viewmodels/inputTextViewmodel';
import type { InputTextareaViewmodel } from '../viewmodels/inputTextareaViewmodel';
import type { InputDateViewmodel } from '../viewmodels/inputDateViewmodel';
import type { InputTimeViewmodel } from '../viewmodels/inputTimeViewmodel';
import type { InputDatetimeViewmodel } from '../viewmodels/inputDatetimeViewmodel';

export abstract class InputViewmodelsFactory
{
    abstract createInputText(): InputTextViewmodel;
    abstract createTextarea(): InputTextareaViewmodel;
    abstract createInputDate(): InputDateViewmodel;
    abstract createInputTime(): InputTimeViewmodel;
    abstract createInputDateTime(): InputDatetimeViewmodel;
}
