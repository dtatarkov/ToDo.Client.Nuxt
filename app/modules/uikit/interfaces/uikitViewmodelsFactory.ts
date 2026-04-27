import type { ButtonViewmodelGeneral, ButtonElementGeneralData } from './buttonViewmodelGeneral';
import type { InputViewmodel } from './inputViewmodel';
import type { GridViewmodel } from './gridViewmodel';
import type { Viewmodel } from './viewmodel';
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { InfoBlockViewmodel } from './infoBlockViewmodel';
import type { ButtonViewmodelIcon, ButtonViewmodelIconData } from './buttonViewmodelIcon';

export abstract class UIKitViewmodelsFactory
{
    abstract createInputText(): InputViewmodel<string>;
    abstract createTextarea(): InputViewmodel<string>;
    abstract createInputDate(): InputViewmodel<Date | undefined>;
    abstract createInputTime(): InputViewmodel<number | undefined>;
    abstract createInputDateTime(): InputViewmodel<Date | undefined>;
    abstract createButtonIcon(data?: Partial<ButtonViewmodelIconData>): ButtonViewmodelIcon;
    abstract createButtonGeneral(data?: Partial<ButtonElementGeneralData>): ButtonViewmodelGeneral;
    abstract createGrid<T extends Viewmodel = Viewmodel>(elements: Observable<T[]>): GridViewmodel<T>;
    abstract createInfoBlock(): InfoBlockViewmodel;
}