import type { ToDo } from "../interfaces/todo";

export abstract class ToDosOwner
{
  abstract getAllToDos(): ToDo[];
  abstract getToDoByIdAsync(id: string): Promise<ToDo | undefined>;
  abstract updateToDosAsync(): Promise<void>;
  abstract initializeToDosAsync(): Promise<void>;
  abstract saveToDoAsync(todo: ToDo): Promise<void>;
  abstract createToDo(): ToDo;
}