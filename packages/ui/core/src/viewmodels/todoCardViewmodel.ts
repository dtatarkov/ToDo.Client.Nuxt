import type { InfoBlockViewmodelState } from './infoBlockViewmodel';
import { Viewmodel } from './viewmodel';

export type ToDoCardViewmodelState = {
    infoBlock: InfoBlockViewmodelState;
    hasFooter: boolean;
};

export type ToDoCardViewmodelData = {
    completionDateActual?: Date;
    completionDatePlanned?: Date;
};

export abstract class ToDoCardViewmodel extends Viewmodel<ToDoCardViewmodelState>
{
    abstract setData(data: ToDoCardViewmodelData): void;
}
