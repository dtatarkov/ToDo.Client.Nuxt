import { dependency } from '@/modules/shared/decorators/dependency';
import { EditToDoUseCase } from "./editToDoUseCase";
import { ToDosOwner } from '../entities/todosOwner';
import { ToDoNotFoundException } from '../exceptions/toDoNotFoundException';
import type { ToDoData } from '../types/todoData';
import { AddFormModalUseCase } from '@/modules/overlay/usecases/addFormModalUseCase';
import { FormFactory } from '@/modules/forms/factories/formFactory';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

@dependency(ToDosOwner)
@dependency(FormFactory)
@dependency(AddFormModalUseCase)
export class EditToDoUseCaseImpl extends EditToDoUseCase
{
  constructor(
    private todosOwner: ToDosOwner,
    private formFactory: FormFactory,
    private addFormModalUseCase: AddFormModalUseCase,
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

    const form = this.formFactory.create<ToDoData>();

    form.setSubmitHandler(async formData =>
    {
      updatePropertiesWithData(todo, formData);
      await todo.saveAsync();
    });

    form.setElementsFromScheme(todo.getEditScheme());
    form.setData(todo.getData());

    const modal = this.addFormModalUseCase.execute(form);
    modal.toEditMode();
  }
}