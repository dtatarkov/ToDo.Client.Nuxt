import { dependency } from '@/modules/shared/decorators/dependency';
import { ShowEditToDoDialogUseCase } from "../interfaces/showEditToDoDialogUseCase";
import { ToDosOwner } from '../interfaces/todosOwner';
import { ToDoNotFoundException } from '../exceptions/toDoNotFoundException';

@dependency(ToDosOwner)
export class ShowEditToDoDialogUseCaseImpl extends ShowEditToDoDialogUseCase
{
  constructor(
    private todosOwner: ToDosOwner
  )
  {
    super();
  }

  async execute(id: string): Promise<void>
  {
    const todo = await this.todosOwner.getToDoByIdAsync(id);

    if (!todo)
    {
      throw new ToDoNotFoundException(id);
    }

    todo.showEditDialog();
  }
}