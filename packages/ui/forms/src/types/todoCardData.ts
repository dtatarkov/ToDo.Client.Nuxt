export type ToDoCardData = {
  id: string;
  title: string;
  description: string;
  completionDateActual?: Date;
  completionDatePlanned?: Date;
};