import type { ToDosOwner } from './todosOwner';
import type { Observable } from '@/modules/shared/interfaces/observable';

export abstract class ToDo
{
  abstract id: string;
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: Date | undefined;
  abstract completionDateActual: Date | undefined;
  abstract owner: ToDosOwner | undefined;

  abstract get isNew(): boolean;

  abstract getData(): ToDoData;
  abstract toObservableData(): Observable<ToDoData>;
  abstract clone(): ToDo;
  abstract saveAsync(): Promise<void>;
  abstract showEditDialog(): void;
}

export type ToDoData = {
  id: string;
  title: string;
  description: string;
  completionDatePlanned: Date | undefined;
  completionDateActual: Date | undefined;
};