export abstract class ToDo {
  abstract id: string
  abstract title: string
  abstract description: string
  abstract completionDatePlanned: Date | undefined
  abstract completionDateActual: Date | undefined
  
  abstract getData(): ToDoData;
}

export type ToDoData = {
  id: string
  title: string
  description: string
  completionDatePlanned: Date | undefined
  completionDateActual: Date | undefined
}