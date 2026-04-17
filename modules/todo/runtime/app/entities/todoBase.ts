import { ToDo, type ToDoData } from "../interfaces/todo";

export class ToDoBase extends ToDo
{
  protected data: ToDoData = {
    id                   : '',
    title                : '',
    description          : '',
    completionDatePlanned: undefined,
    completionDateActual : undefined
  }

  get id(): string
  {
    return this.data.id;
  }

  get title(): string
  {
    return this.data.title;
  }

  get description(): string
  {
    return this.data.description;
  }

  get completionDatePlanned(): Date | undefined
  {
    return this.data.completionDatePlanned;
  }

  get completionDateActual(): Date | undefined
  {
    return this.data.completionDateActual;
  }

  set id(value: string)
  {
    this.data.id = value;
  }

  set title(value: string)
  {
    this.data.title = value;
  }

  set description(value: string)
  {
    this.data.description = value;
  }

  set completionDatePlanned(value: Date | undefined)
  {
    this.data.completionDatePlanned = value;
  }

  set completionDateActual(value: Date | undefined)
  {
    this.data.completionDateActual = value;
  }

  getData(): ToDoData
  {
    return {
      ...this.data
    };
  }
}