import { dependency } from '@/modules/shared/decorators/dependency';
import { ShowAddToDoDialogUseCase } from "../interfaces/showAddToDoDialogUseCase";
import { ToDosOwner } from '../interfaces/todosOwner';

@dependency(ToDosOwner)
export class ShowAddToDoDialogUseCaseImpl extends ShowAddToDoDialogUseCase
{
  constructor(
    private todosOwner: ToDosOwner
  )
  {
    super();
  }

  execute(): void
  {
    const todo = this.todosOwner.createToDo();
    todo.showEditDialog();
  }
}