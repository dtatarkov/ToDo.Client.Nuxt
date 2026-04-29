import { ToDosService } from "../interfaces/todosService";
import { ToDo } from "../interfaces/todo";
import { ToDosOwner } from "../interfaces/todosOwner";
import type { Observable } from '@/modules/shared/interfaces/observable';
import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDoFactory } from '../interfaces/todoFactory';

@dependency(ToDosOwner)
export class TodosServiceImpl extends ToDosService
{
  constructor(
    private owner: ToDosOwner,
  )
  {
    super();
  }

  override getAllToDosAsync(): Promise<Observable<ToDo[]>>
  {
    return this.owner.getAllToDosAsync();
  }

  override async updateToDosAsync(): Promise<void>
  {
    await this.owner.updateToDosAsync();
  }

  override showAddToDoDialog(): void
  {
    const todo = this.owner.createToDo();
    todo.showEditDialog();
  }
}