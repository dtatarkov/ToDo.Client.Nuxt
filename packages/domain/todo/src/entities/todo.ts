import type { ToDosOwner } from './todosOwner';
import type { ToDoData } from '../types/todoData';

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
  abstract setData(data: Partial<ToDoData>): void;
  abstract clone(): ToDo;
  abstract saveAsync(): Promise<void>;
}