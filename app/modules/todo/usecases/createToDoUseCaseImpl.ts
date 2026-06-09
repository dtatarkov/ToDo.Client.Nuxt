import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDosOwner } from '../entities/todosOwner';
import { CreateToDoUseCase } from './createToDoUseCase';
import type { ToDoData } from '../types/todoData';
import { FormFactory } from '@/modules/forms/factories/formFactory';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { Overlay } from '@/modules/overlay/entities/overlay';

@dependency(ToDosOwner)
@dependency(Overlay)
@dependency(FormFactory)
export class CreateToDoUseCaseImpl extends CreateToDoUseCase
{
  constructor(
    private todosOwner: ToDosOwner,
    private overlay: Overlay,
    private formFactory: FormFactory,
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

    this.overlay
      .createModal(form)
      .addButtonConfirm(form.getSubmitCommand()).asCreateButton()
      .addButtonCancel();
  }
}