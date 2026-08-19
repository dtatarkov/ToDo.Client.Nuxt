import type { InputTextViewmodel } from '../viewmodels/inputTextViewmodel';
import type { InputTextareaViewmodel } from '../viewmodels/inputTextareaViewmodel';
import type { InputDateViewmodel } from '../viewmodels/inputDateViewmodel';
import type { InputTimeViewmodel } from '../viewmodels/inputTimeViewmodel';
import type { InputDatetimeViewmodel } from '../viewmodels/inputDatetimeViewmodel';
import type { InputHiddenViewmodel } from '../viewmodels/inputHiddenViewmodel';
import type { InfoBlockViewmodel } from '../viewmodels/infoBlockViewmodel';
import type { InputType } from '../enums/inputType';
import type { InputViewmodel } from '../viewmodels/inputViewmodel';

export abstract class UIKitViewmodelsFactory
{
    abstract createInput(type: InputType.inputText): InputTextViewmodel;
    abstract createInput(type: InputType.inputTextarea): InputTextareaViewmodel;
    abstract createInput(type: InputType.inputDate): InputDateViewmodel;
    abstract createInput(type: InputType.inputTime): InputTimeViewmodel;
    abstract createInput(type: InputType.inputDateTime): InputDatetimeViewmodel;
    abstract createInput(type: InputType.inputHidden): InputHiddenViewmodel;
    abstract createInput(type: InputType): InputViewmodel<any>;

    abstract createInputText(): InputTextViewmodel;
    abstract createTextarea(): InputTextareaViewmodel;
    abstract createInputDate(): InputDateViewmodel;
    abstract createInputTime(): InputTimeViewmodel;
    abstract createInputDateTime(): InputDatetimeViewmodel;
    abstract createInputHidden(): InputHiddenViewmodel;
    abstract createInfoBlock(): InfoBlockViewmodel;
}
