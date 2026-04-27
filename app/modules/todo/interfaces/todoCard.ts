import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';

export abstract class ToDoCard extends Viewmodel<string>
{
  abstract readonly id: string;
  abstract readonly title: string;
  abstract readonly description: string;
  abstract readonly completionDatePlanned: Date | undefined;
  abstract readonly completionDateActual: Date | undefined;
}