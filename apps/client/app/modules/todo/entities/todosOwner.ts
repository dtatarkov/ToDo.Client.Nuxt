import type { ToDo } from "./todo";
import type { Action, DisposeToken  } from '@packages/shared';


export abstract class ToDosOwner implements Disposable
{
  abstract getAllToDos(): ToDo[];
  abstract getToDoByIdAsync(id: string): Promise<ToDo | undefined>;
  abstract updateToDosAsync(): Promise<void>;
  abstract initializeToDosAsync(): Promise<void>;
  abstract saveToDoAsync(todo: ToDo): Promise<void>;
  abstract createToDo(): ToDo;
  abstract onToDosChange(callback: Action<[ToDo[]]>, disposeToken?: DisposeToken): void;
  abstract [Symbol.dispose](): void;
}