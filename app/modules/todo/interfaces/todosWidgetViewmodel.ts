import { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import type { ToolbarViewmodel } from '@/modules/uikit/interfaces/toolbarViewmodel';
import type { GridViewmodel } from '@/modules/uikit/interfaces/gridViewmodel';

export abstract class ToDosWidgetViewmodel extends Viewmodel<string>
{
  abstract readonly grid: GridViewmodel;
  abstract readonly toolbar: ToolbarViewmodel;

  abstract initialize(): Promise<void>;
  abstract addToDo(): void;
  abstract editToDo(id: string): void;
}