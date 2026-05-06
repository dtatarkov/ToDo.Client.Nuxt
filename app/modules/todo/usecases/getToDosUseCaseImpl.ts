import type { Observable } from '@/modules/shared/interfaces/observable';
import { GetToDosUseCase } from "../interfaces/getToDosUseCase";
import { ToDosOwner } from "../interfaces/todosOwner";
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDoData } from '../interfaces/todo';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';

@dependency(ToDosOwner)
export class GetToDosUseCaseImpl extends GetToDosUseCase
{
  constructor(
    private readonly todosOwner: ToDosOwner
  )
  {
    super();
  }

  override execute(): Observable<ToDoData[]>
  {
    const todos = this.todosOwner.getAllToDos();
    const todosData = new ObservableComputed(() => todos.value.map(todo => todo.getData()));

    return todosData;
  }
}