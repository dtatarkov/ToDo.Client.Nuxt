import type { Action } from '@/modules/shared/types/action';
import type { ButtonIconViewmodel } from '@/modules/uikit/interfaces/buttonIconViewmodel';
import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';

export type ToDoCardViewmodelData = {
  title: string;
  description: string;
  completionDateActual?: Date;
  completionDatePlanned?: Date;
};

export type ToDoCardViewmodelSetupContext = {
  editButton: ButtonIconViewmodel;
};

export abstract class ToDoCardViewmodel extends Viewmodel<string>
{
  abstract setSource(source: ToDoCardViewmodelData): void;
  abstract setClickHandler(handler: Action): void;
}