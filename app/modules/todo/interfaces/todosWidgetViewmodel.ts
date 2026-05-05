import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import type { ToolbarViewmodel } from '@/modules/uikit/interfaces/toolbarViewmodel';

export abstract class ToDosWidgetViewmodel extends Viewmodel<string>
{
  abstract readonly cards: Observable<ToDoCardDataWithIdentity[]>;
  abstract readonly toolbar: ToolbarViewmodel;

  abstract initialize(): Promise<void>;
  abstract addToDo(): void;
  abstract editToDo(id: string): void;
}