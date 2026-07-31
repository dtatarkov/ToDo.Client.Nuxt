import type { DisposeToken } from '@client/shared';
import type { InputTextViewmodel } from '../viewmodels/inputTextViewmodel';
import type { InputTextareaViewmodel } from '../viewmodels/inputTextareaViewmodel';
import type { InputDateViewmodel } from '../viewmodels/inputDateViewmodel';
import type { InputTimeViewmodel } from '../viewmodels/inputTimeViewmodel';
import type { InputDatetimeViewmodel } from '../viewmodels/inputDatetimeViewmodel';
import type { InfoBlockViewmodel } from '../viewmodels/infoBlockViewmodel';

export abstract class UIKitViewmodelsFactory
{
    abstract createInputText(disposeToken?: DisposeToken): InputTextViewmodel;
    abstract createTextarea(disposeToken?: DisposeToken): InputTextareaViewmodel;
    abstract createInputDate(disposeToken?: DisposeToken): InputDateViewmodel;
    abstract createInputTime(disposeToken?: DisposeToken): InputTimeViewmodel;
    abstract createInputDateTime(disposeToken?: DisposeToken): InputDatetimeViewmodel;
    abstract createInfoBlock(disposeToken?: DisposeToken): InfoBlockViewmodel;
}
