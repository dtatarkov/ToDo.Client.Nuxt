import type { ToDo } from "./todo";
import type { ObservableReadonly } from '@client/shared';


export abstract class ToDosStore implements Disposable
{
  abstract todos: ObservableReadonly<ToDo[]>;

  abstract getToDoByIdAsync(id: string): Promise<ToDo | undefined>;
  abstract updateToDosAsync(): Promise<void>;
  abstract initializeToDosAsync(): Promise<void>;
  abstract saveToDoAsync(todo: ToDo): Promise<void>;
  abstract createToDo(): ToDo;

  abstract [Symbol.dispose](): void;
}