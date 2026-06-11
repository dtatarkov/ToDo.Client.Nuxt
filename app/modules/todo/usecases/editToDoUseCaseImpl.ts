import { dependency } from '@/modules/shared/decorators/dependency';
import { EditToDoUseCase } from "./editToDoUseCase";
import { ToDosOwner } from '../entities/todosOwner';
import { ToDoNotFoundException } from '../exceptions/toDoNotFoundException';

@dependency(ToDosOwner)
export class EditToDoUseCaseImpl extends EditToDoUseCase
{
  constructor(
    private todosOwner: ToDosOwner,
  )
  {
    super();
  }

  async executeAsync(id: string): Promise<void>
  {
    const todo = await this.todosOwner.getToDoByIdAsync(id);

    if (!todo)
    {
      throw new ToDoNotFoundException(id);
    }

    todo.showForm();
  }
}