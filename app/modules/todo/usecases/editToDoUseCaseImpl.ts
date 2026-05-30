import { dependency } from '@/modules/shared/decorators/dependency';
import { EditToDoUseCase } from "./editToDoUseCase";
import { ToDosOwner } from '../entities/todosOwner';
import { ToDoNotFoundException } from '../exceptions/toDoNotFoundException';
import type { ToDoData } from '../types/todoData';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import { AddFormModalUseCase } from '@/modules/overlay/usecases/addFormModalUseCase';
import { FormFactory } from '@/modules/forms/factories/formFactory';

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
      todo.title = formData.title;
      todo.description = formData.description;
      todo.completionDatePlanned = formData.completionDatePlanned;

      await todo.saveAsync();
    });

    form.setElements({
      title: {
        type: FormElementType.inputText,
        label: 'Название задачи',
        placeholder: 'Введите название задачи',
      },

      description: {
        type: FormElementType.textarea,
        label: 'Описание задачи',
        placeholder: 'Введите описание задачи'
      },

      completionDatePlanned: {
        type: FormElementType.inputDateTime,
        label: 'Плановая дата выполнения',
      }
    });

    form.setData(todo.getData());

    const modal = this.addFormModalUseCase.execute(form);
    modal.toEditMode();
  }
}