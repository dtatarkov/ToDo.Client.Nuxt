import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDosOwner } from '../interfaces/todosOwner';
import { CreateToDoUseCase } from './createToDoUseCase';
import type { ToDoData } from '../interfaces/todo';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import { AddFormModalUseCase } from '@/modules/overlay/usecases/addFormModalUseCase';
import { FormFactory } from '@/modules/forms/factories/formFactory';

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

    const form = this.formFactory.create<ToDoData>({
      submit: async formData =>
      {
        todo.title = formData.title;
        todo.description = formData.description;
        todo.completionDatePlanned = formData.completionDatePlanned;

        await todo.saveAsync();
      }
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
    modal.toAddMode();
  }
}