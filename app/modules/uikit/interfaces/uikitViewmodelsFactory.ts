import type { ButtonGeneralViewmodel, ButtonGeneralViewmodelData } from './buttonGeneralViewmodel';
import type { InputViewmodel } from './inputViewmodel';
import type { GridViewmodel } from './gridViewmodel';
import type { Viewmodel } from './viewmodel';
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { InfoBlockViewmodel } from './infoBlockViewmodel';
import type { ButtonIconViewmodel, ButtonIconViewmodelData } from './buttonIconViewmodel';
import type { CardViewmodel } from './cardViewmodel';

export abstract class UIKitViewmodelsFactory
{
    abstract createInputText(): InputViewmodel<string>;
    abstract createTextarea(): InputViewmodel<string>;
    abstract createInputDate(): InputViewmodel<Date | undefined>;
    abstract createInputTime(): InputViewmodel<number | undefined>;
    abstract createInputDateTime(): InputViewmodel<Date | undefined>;
    abstract createButtonIcon(data?: Partial<ButtonIconViewmodelData>): ButtonIconViewmodel;
    abstract createButtonGeneral(data?: Partial<ButtonGeneralViewmodelData>): ButtonGeneralViewmodel;
    abstract createGrid<T extends Viewmodel = Viewmodel>(elements: Observable<T[]>): GridViewmodel<T>;
    abstract createInfoBlock(): InfoBlockViewmodel;
    abstract createCard(): CardViewmodel;
}