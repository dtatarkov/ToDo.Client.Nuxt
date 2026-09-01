import type { ToDoData } from '../types/todoData';
import type { ToDoAddData } from '../types/todoAddData';
import type { ToDoUpdateData } from '../types/todoUpdateData';
import type { ObservableReadonly } from '@client/shared';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';

export abstract class ToDoStore implements Disposable
{
  abstract todos: ObservableReadonly<ToDoData[]>;

  abstract getToDoByIdAsync(id: string): Promise<ToDoData | undefined>;
  abstract updateToDosAsync(): Promise<void>;
  abstract initializeToDosAsync(): Promise<void>;

  abstract addToDoAsync(data: ToDoAddData): Promise<void>;
  abstract updateToDoAsync(data: ToDoUpdateData): Promise<void>;

  abstract getAddScheme(): EntityScheme<any, ToDoAddData>;
  abstract getUpdateSchemeAsync(id: string): Promise<EntityScheme<any, ToDoUpdateData> | undefined>;

  abstract [Symbol.dispose](): void;
}