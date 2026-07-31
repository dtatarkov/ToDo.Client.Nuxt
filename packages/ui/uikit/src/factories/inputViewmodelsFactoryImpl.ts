import type { InputDateViewmodel } from '../viewmodels/inputDateViewmodel';
import type { InputDatetimeViewmodel } from '../viewmodels/inputDatetimeViewmodel';
import type { InputTextareaViewmodel } from '../viewmodels/inputTextareaViewmodel';
import type { InputTimeViewmodel } from '../viewmodels/inputTimeViewmodel';
import { InputViewmodelsFactory } from './inputViewmodelsFactory';
import { InputDateViewmodelImpl } from '../viewmodels/inputDateViewmodelImpl';
import { InputDatetimeViewmodelImpl } from '../viewmodels/inputDatetimeViewmodelImpl';
import { InputTextViewmodelImpl } from '../viewmodels/inputTextViewmodelImpl';
import { InputTextareaViewmodelImpl } from '../viewmodels/inputTextareaViewmodelImpl';
import { InputTimeViewmodelImpl } from '../viewmodels/inputTimeViewmodelImpl';
import type { InputTextViewmodel } from '../viewmodels/inputTextViewmodel';

export class InputViewmodelsFactoryImpl extends InputViewmodelsFactory
{
    override createInputText(): InputTextViewmodel
    {
        return new InputTextViewmodelImpl();
    }

    override createTextarea(): InputTextareaViewmodel
    {
        return new InputTextareaViewmodelImpl();
    }

    override createInputDate(): InputDateViewmodel
    {
        return new InputDateViewmodelImpl();
    }

    override createInputTime(): InputTimeViewmodel
    {
        return new InputTimeViewmodelImpl();
    }

    override createInputDateTime(): InputDatetimeViewmodel
    {
        return new InputDatetimeViewmodelImpl();
    }
}
