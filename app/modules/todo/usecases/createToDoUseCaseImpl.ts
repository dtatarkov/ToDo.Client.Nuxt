import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDosOwner } from '../interfaces/todosOwner';
import { CreateToDoUseCase } from './createToDoUseCase';
import { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import type { ToDoData } from '../interfaces/todo';
import { FormElementType } from '@/modules/forms/enums/formElementType';

@dependency(ToDosOwner)
@dependency(FormViewmodelFactory)
@dependency(OverlayService)
export class CreateToDoUseCaseImpl extends CreateToDoUseCase
{
  constructor(
    private todosOwner: ToDosOwner,
    private formFactory: FormViewmodelFactory,
    private overlayService: OverlayService,
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

    const modal = this.overlayService.addModalConfirmForm(form);
    modal.setAddButton();
  }
}