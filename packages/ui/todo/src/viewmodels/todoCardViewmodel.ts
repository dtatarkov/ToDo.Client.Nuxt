import { Viewmodel } from '@client/ui-core';
import type { InfoBlockViewmodelState } from '@client/ui-uikit';
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
