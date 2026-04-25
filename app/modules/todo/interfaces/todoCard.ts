import { UIElement } from '@/modules/uikit/interfaces/uiElement';

export abstract class ToDoCard extends UIElement<string>
{
  abstract readonly id: string;
  abstract readonly title: string;
  abstract readonly description: string;
  abstract readonly completionDatePlanned: Date | undefined;
  abstract readonly completionDateActual: Date | undefined;
}