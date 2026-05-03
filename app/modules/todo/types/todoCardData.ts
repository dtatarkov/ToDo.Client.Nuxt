export type ToDoCardData = {
  title?: string;
  description?: string;
  completionDateActual?: Date;
  completionDatePlanned?: Date;
};

export type ToDoCardDataWithIdentity = ToDoCardData & { id: string; };