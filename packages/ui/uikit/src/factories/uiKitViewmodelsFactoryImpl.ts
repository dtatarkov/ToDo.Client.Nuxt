import type { InputDateViewmodel } from '../viewmodels/inputDateViewmodel';
import type { InputDatetimeViewmodel } from '../viewmodels/inputDatetimeViewmodel';
import type { InputTextareaViewmodel } from '../viewmodels/inputTextareaViewmodel';
import type { InputTimeViewmodel } from '../viewmodels/inputTimeViewmodel';
import type { InputTextViewmodel } from '../viewmodels/inputTextViewmodel';
import type { InputHiddenViewmodel } from '../viewmodels/inputHiddenViewmodel';
import type { InfoBlockViewmodel } from '../viewmodels/infoBlockViewmodel';
import { UIKitViewmodelsFactory } from './uiKitViewmodelsFactory';
import { InputDateViewmodelImpl } from '../viewmodels/inputDateViewmodelImpl';
import { InputDatetimeViewmodelImpl } from '../viewmodels/inputDatetimeViewmodelImpl';
import { InputTextViewmodelImpl } from '../viewmodels/inputTextViewmodelImpl';
import { InputTextareaViewmodelImpl } from '../viewmodels/inputTextareaViewmodelImpl';
import { InputTimeViewmodelImpl } from '../viewmodels/inputTimeViewmodelImpl';
import { InputHiddenViewmodelImpl } from '../viewmodels/inputHiddenViewmodelImpl';
import { InfoBlockViewmodelImpl } from '../viewmodels/infoBlockViewmodelImpl';
import { ButtonGeneralViewmodelImpl } from '../viewmodels/buttonGeneralViewmodelImpl';
import { ButtonIconViewmodelImpl } from '../viewmodels/buttonIconViewmodelImpl';
import { InputType } from '../enums/inputType';
import type { InputViewmodel } from '../viewmodels/inputViewmodel';
import type { ButtonGeneralViewmodel } from '../viewmodels/buttonGeneralViewmodel';
import type { ButtonIconViewmodel } from '../viewmodels/buttonIconViewmodel';
import { UnknownInputTypeException } from '../exceptions/unknownInputTypeException';

export class UIKitViewmodelsFactoryImpl extends UIKitViewmodelsFactory
{
    override createInputText(): InputTextViewmodel
    {
        const vm = new InputTextViewmodelImpl();

        return vm;
    }

    override createTextarea(): InputTextareaViewmodel
    {
        const vm = new InputTextareaViewmodelImpl();

        return vm;
    }

    override createInputDate(): InputDateViewmodel
    {
        const vm = new InputDateViewmodelImpl();

        return vm;
    }

    override createInputTime(): InputTimeViewmodel
    {
        const vm = new InputTimeViewmodelImpl();

        return vm;
    }

    override createInputDateTime(): InputDatetimeViewmodel
    {
        const vm = new InputDatetimeViewmodelImpl();

        return vm;
    }

    override createInputHidden(): InputHiddenViewmodel
    {
        const vm = new InputHiddenViewmodelImpl();

        return vm;
    }

    override createInput(type: InputType): InputViewmodel<any>
    {
        let inputElement: InputViewmodel<any>;

        switch (type)
        {
            case InputType.inputText:
                inputElement = this.createInputText();
                break;

            case InputType.inputTextarea:
                inputElement = this.createTextarea();
                break;

            case InputType.inputDate:
                inputElement = this.createInputDate();
                break;

            case InputType.inputTime:
                inputElement = this.createInputTime();
                break;

            case InputType.inputDateTime:
                inputElement = this.createInputDateTime();
                break;

            case InputType.inputHidden:
                inputElement = this.createInputHidden();
                break;

            default:
                throw new UnknownInputTypeException(type as InputType);
        }

        return inputElement;
    }

    override createInfoBlock(): InfoBlockViewmodel
    {
        const vm = new InfoBlockViewmodelImpl();

        return vm;
    }

    override createButtonGeneral(): ButtonGeneralViewmodel
    {
        const vm = new ButtonGeneralViewmodelImpl();

        return vm;
    }

    override createButtonIcon(): ButtonIconViewmodel
    {
        const vm = new ButtonIconViewmodelImpl();

        return vm;
    }
}
