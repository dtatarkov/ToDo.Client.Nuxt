import type { ButtonGeneralViewmodel, ButtonGeneralViewmodelData, ButtonGeneralViewmodelHandlers } from './buttonGeneralViewmodel';
import type { InputViewmodel } from './inputViewmodel';
import type { GridViewmodel } from './gridViewmodel';
import type { Viewmodel } from './viewmodel';
import type { InfoBlockViewmodel } from './infoBlockViewmodel';
import type { ButtonIconViewmodel, ButtonIconViewmodelData, ButtonIconViewmodelHandlers } from './buttonIconViewmodel';
import type { CardViewmodel } from './cardViewmodel';
import type { ToolbarViewmodel } from './toolbarViewmodel';
import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';
import type { InputTextViewmodel } from './inputTextViewmodel';

export abstract class UIKitViewmodelsFactory
{
    abstract createInputText(): InputTextViewmodel;
    abstract createTextarea(): InputViewmodel<string>;
    abstract createInputDate(): InputViewmodel<Date | undefined>;
    abstract createInputTime(): InputViewmodel<number | undefined>;
    abstract createInputDateTime(): InputViewmodel<Date | undefined>;
    abstract createButtonIcon(config?: Partial<ButtonIconViewmodelData> & Partial<ButtonIconViewmodelHandlers>): ButtonIconViewmodel;
    abstract createButtonGeneral(config?: Partial<ButtonGeneralViewmodelData> & Partial<ButtonGeneralViewmodelHandlers>): ButtonGeneralViewmodel;
    abstract createGrid<T extends Viewmodel = Viewmodel>(source?: MaybeObservable<T[]>): GridViewmodel<T>;
    abstract createInfoBlock(): InfoBlockViewmodel;
    abstract createCard(): CardViewmodel;
    abstract createToolbar<T extends Viewmodel = Viewmodel>(): ToolbarViewmodel<T>;
}