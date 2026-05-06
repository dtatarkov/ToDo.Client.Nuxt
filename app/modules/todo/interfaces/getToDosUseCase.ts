import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDoData } from "./todo";

export abstract class GetToDosUseCase
{
  abstract execute(): Observable<ToDoData[]>;
}