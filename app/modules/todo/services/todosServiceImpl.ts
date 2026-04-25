import { ToDosService } from "../interfaces/todosService";
import { ToDo } from "../interfaces/todo";
import { ToDosOwner } from "../interfaces/todosOwner";
import { FormElementType } from '@/modules/forms/enums/formElementType';
import { FormFactory } from '@/modules/forms/interfaces/formFactory';
import { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { ToDoNotFoundException } from '../exceptions/toDoNotFoundException';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(ToDosOwner)
@dependency(OverlayService)
@dependency(FormFactory)
export class TodosServiceImpl extends ToDosService
{
  constructor(
    protected owner: ToDosOwner,
    protected overlayService: OverlayService,
    protected formFactory: FormFactory
  )
  {
    super();
  }

  override getAllToDos(): Observable<ToDo[]>
  {
    return this.owner.getAllToDos();
  }

  override async updateToDosAsync(): Promise<void>
  {
    await this.owner.updateToDosAsync();
  }

  override async editToDoAsync(todoId: string): Promise<void>
  {
    const todo = this.owner.getToDoById(todoId);

    if (!todo)
    {
      throw new ToDoNotFoundException(todoId);
    }

    const form = this.formFactory.create<ToDo>();

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

    form.setData(todo);

    form.onSubmit.subscribe(async (formData) =>
    {
      await form.use(async () =>
      {
        todo.title = formData.title;
        todo.description = formData.description;
        todo.completionDatePlanned = formData.completionDatePlanned;

        await todo.saveAsync();
      });

      modal.close();
    });

    const modal = this.overlayService.createModalEditForm(form);
    modal.title = 'Редактирование';
    modal.content = form;
  }
}