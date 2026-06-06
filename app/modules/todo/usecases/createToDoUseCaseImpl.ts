import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDosOwner } from '../entities/todosOwner';
import { CreateToDoUseCase } from './createToDoUseCase';
import type { ToDoData } from '../types/todoData';
import { AddFormModalUseCase } from '@/modules/overlay/usecases/addFormModalUseCase';
import { FormFactory } from '@/modules/forms/factories/formFactory';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

@dependency(ToDosOwner)
@dependency(FormFactory)
@dependency(AddFormModalUseCase)
export class CreateToDoUseCaseImpl extends CreateToDoUseCase
{
  constructor(
    private todosOwner: ToDosOwner,
    private formFactory: FormFactory,
    private addFormModalUseCase: AddFormModalUseCase,
  )
  {
    super();
  }

  execute(): void
  {
    const todo = this.todosOwner.createToDo();

    const form = this.formFactory.create<ToDoData>();

    form.setSubmitHandler(async formData =>
    {
      updatePropertiesWithData(todo, formData);
      await todo.saveAsync();
    });

    form.setElementsFromScheme(todo.getAddScheme());
    form.setData(todo.getData());

    const modal = this.addFormModalUseCase.execute(form);
    modal.setConfirmCommand(form.getSubmitCommand());
    modal.toAddMode();
  }
}