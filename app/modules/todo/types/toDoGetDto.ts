import type { ToDoStateType } from "../enums/toDoStateType";

export type ToDoGetDto = {
  id: string;
  title: string;
  description: string;
  completionDatePlanned?: string;
  completionDateActual?: string;
  state: ToDoStateType
}