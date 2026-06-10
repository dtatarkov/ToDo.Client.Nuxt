import { dependency } from '@/modules/shared/decorators/dependency';
import { EditToDoUseCase } from "./editToDoUseCase";
import { ToDosOwner } from '../entities/todosOwner';
import { ToDoNotFoundException } from '../exceptions/toDoNotFoundException';
import type { ToDoData } from '../types/todoData';
import { FormFactory } from '@/modules/forms/factories/formFactory';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { Overlay } from '@/modules/overlay/entities/overlay';

@dependency(ToDosOwner)
@dependency(Overlay)
@dependency(FormFactory)
export class EditToDoUseCaseImpl extends EditToDoUseCase
{
  constructor(
    private todosOwner: ToDosOwner,
    private overlay: Overlay,
    private formFactory: FormFactory,
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

    this.overlay
      .createModal()
      .setContent(form)
      .addButtonConfirm(form.getSubmitCommand()).asEditButton()
      .addButtonCancel()
      .init();
  }
}