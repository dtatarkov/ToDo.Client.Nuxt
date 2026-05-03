import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';

export abstract class ToDosWidgetViewmodel extends Viewmodel<string>
{
  abstract cards: ToDoCardDataWithIdentity[];

  abstract initialize(): Promise<void>;
  abstract addToDo(): void;
  abstract editToDo(id: string): void;
}