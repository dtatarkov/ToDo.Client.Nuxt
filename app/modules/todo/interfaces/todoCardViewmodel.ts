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
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: Date | undefined;
  abstract completionDateActual: Date | undefined;
}