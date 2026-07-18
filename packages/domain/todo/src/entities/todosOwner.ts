import type { ToDo } from "./todo";
import type { ObservableArray } from '@client/shared';


export abstract class ToDosOwner implements Disposable
{
  abstract todos: ObservableArray<ToDo>;

  abstract getAllToDos(): ToDo[];
  abstract getToDoByIdAsync(id: string): Promise<ToDo | undefined>;
  abstract updateToDosAsync(): Promise<void>;
  abstract initializeToDosAsync(): Promise<void>;
  abstract saveToDoAsync(todo: ToDo): Promise<void>;
  abstract createToDo(): ToDo;

  abstract [Symbol.dispose](): void;
}