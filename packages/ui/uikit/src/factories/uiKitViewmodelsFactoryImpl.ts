import type { DisposeToken } from '@client/shared';
import type { InputDateViewmodel } from '../viewmodels/inputDateViewmodel';
import type { InputDatetimeViewmodel } from '../viewmodels/inputDatetimeViewmodel';
import type { InputTextareaViewmodel } from '../viewmodels/inputTextareaViewmodel';
import type { InputTimeViewmodel } from '../viewmodels/inputTimeViewmodel';
import type { InputTextViewmodel } from '../viewmodels/inputTextViewmodel';
import type { InfoBlockViewmodel } from '../viewmodels/infoBlockViewmodel';
import { UIKitViewmodelsFactory } from './uiKitViewmodelsFactory';
import { InputDateViewmodelImpl } from '../viewmodels/inputDateViewmodelImpl';
import { InputDatetimeViewmodelImpl } from '../viewmodels/inputDatetimeViewmodelImpl';
import { InputTextViewmodelImpl } from '../viewmodels/inputTextViewmodelImpl';
import { InputTextareaViewmodelImpl } from '../viewmodels/inputTextareaViewmodelImpl';
import { InputTimeViewmodelImpl } from '../viewmodels/inputTimeViewmodelImpl';
import { InfoBlockViewmodelImpl } from '../viewmodels/infoBlockViewmodelImpl';

export class UIKitViewmodelsFactoryImpl extends UIKitViewmodelsFactory
{
    override createInputText(disposeToken?: DisposeToken): InputTextViewmodel
    {
        const vm = this.withToken(new InputTextViewmodelImpl(), disposeToken);
        return vm;
    }

    override createTextarea(disposeToken?: DisposeToken): InputTextareaViewmodel
    {
        const vm = this.withToken(new InputTextareaViewmodelImpl(), disposeToken);
        return vm;
    }

    override createInputDate(disposeToken?: DisposeToken): InputDateViewmodel
    {
        const vm = this.withToken(new InputDateViewmodelImpl(), disposeToken);
        return vm;
    }

    override createInputTime(disposeToken?: DisposeToken): InputTimeViewmodel
    {
        const vm = this.withToken(new InputTimeViewmodelImpl(), disposeToken);
        return vm;
    }

    override createInputDateTime(disposeToken?: DisposeToken): InputDatetimeViewmodel
    {
        const vm = this.withToken(new InputDatetimeViewmodelImpl(), disposeToken);
        return vm;
    }

    override createInfoBlock(disposeToken?: DisposeToken): InfoBlockViewmodel
    {
        const vm = this.withToken(new InfoBlockViewmodelImpl(), disposeToken);
        return vm;
    }

    private withToken<T extends Disposable>(instance: T, disposeToken?: DisposeToken): T
    {
        disposeToken?.registerDisposable(instance);
        return instance;
    }
}
