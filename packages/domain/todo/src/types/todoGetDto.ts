import type { ToDoStateType } from "../enums/todoStateType";

export type ToDoGetDto = {
  id: string;
  title: string;
  description: string;
  completionDatePlanned?: string;
  completionDateActual?: string;
  state: ToDoStateType;
};