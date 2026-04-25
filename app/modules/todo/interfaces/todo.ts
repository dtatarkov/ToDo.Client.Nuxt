import type { ToDosOwner } from './todosOwner';

export abstract class ToDo
{
  abstract id: string;
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: Date | undefined;
  abstract completionDateActual: Date | undefined;
  abstract owner: ToDosOwner | undefined;

  abstract getData(): ToDoData;
  abstract clone(): ToDo;
  abstract saveAsync(): Promise<void>;
}

export type ToDoData = {
  id: string;
  title: string;
  description: string;
  completionDatePlanned: Date | undefined;
  completionDateActual: Date | undefined;
};