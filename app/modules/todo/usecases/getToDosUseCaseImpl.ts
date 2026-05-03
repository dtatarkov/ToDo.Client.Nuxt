import type { Observable } from '@/modules/shared/interfaces/observable';
import { GetToDosUseCase } from "../interfaces/getToDosUseCase";
import { ToDosOwner } from "../interfaces/todosOwner";
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDo } from '../interfaces/todo';

@dependency(ToDosOwner)
export class GetToDosUseCaseImpl extends GetToDosUseCase
{
  constructor(
    private readonly todosOwner: ToDosOwner
  )
  {
    super();
  }

  override execute(): Observable<ToDo[]>
  {
    const todos = this.todosOwner.getAllToDos();

    return todos;
  }
}