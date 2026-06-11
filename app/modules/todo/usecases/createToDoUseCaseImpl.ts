import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDosOwner } from '../entities/todosOwner';
import { CreateToDoUseCase } from './createToDoUseCase';

@dependency(ToDosOwner)
export class CreateToDoUseCaseImpl extends CreateToDoUseCase
{
  constructor(
    private todosOwner: ToDosOwner,
  )
  {
    super();
  }

  execute(): void
  {
    const todo = this.todosOwner.createToDo();
    todo.showForm();
  }
}