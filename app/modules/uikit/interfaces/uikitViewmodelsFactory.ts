import type { ButtonGeneralViewmodel, ButtonGeneralViewmodelData, ButtonGeneralViewmodelHandlers } from './buttonGeneralViewmodel';
import type { GridViewmodel } from './gridViewmodel';
import type { Viewmodel } from './viewmodel';
import type { InfoBlockViewmodel } from './infoBlockViewmodel';
import type { ButtonIconViewmodel, ButtonIconViewmodelData, ButtonIconViewmodelHandlers } from './buttonIconViewmodel';
import type { CardViewmodel } from './cardViewmodel';
import type { ToolbarViewmodel } from './toolbarViewmodel';
import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';
import type { InputTextViewmodel } from './inputTextViewmodel';
import type { InputTextareaViewmodel } from './inputTextareaViewmodel';
import type { InputDateViewmodel } from './inputDateViewmodel';
import type { InputDateTimeViewmodel } from './inputDateTimeViewmodel';
import type { InputTimeViewmodel } from './inputTimeViewmodel';

export abstract class UIKitViewmodelsFactory
{
    abstract createInputText(): InputTextViewmodel;
    abstract createTextarea(): InputTextareaViewmodel;
    abstract createInputDate(): InputDateViewmodel;
    abstract createInputTime(): InputTimeViewmodel;
    abstract createInputDateTime(): InputDateTimeViewmodel;
    abstract createButtonIcon(config?: Partial<ButtonIconViewmodelData> & Partial<ButtonIconViewmodelHandlers>): ButtonIconViewmodel;
    abstract createButtonGeneral(config?: Partial<ButtonGeneralViewmodelData> & Partial<ButtonGeneralViewmodelHandlers>): ButtonGeneralViewmodel;
    abstract createGrid<T extends Viewmodel = Viewmodel>(source?: MaybeObservable<T[]>): GridViewmodel<T>;
    abstract createInfoBlock(): InfoBlockViewmodel;
    abstract createCard(): CardViewmodel;
    abstract createToolbar<T extends Viewmodel = Viewmodel>(): ToolbarViewmodel<T>;
}