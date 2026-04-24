import { ToDosService } from "../interfaces/todosService";
import { ToDo } from "../interfaces/todo";
import type { ToDosOwner } from "../interfaces/todosOwner";
import { FormElementType } from '@/modules/forms/enums/formElementType';
import type { FormFactory } from '@/modules/forms/interfaces/formFactory';
import type { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { ToDoNotFoundException } from '../exceptions/toDoNotFoundException';

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

    const todoToEdit = todo.clone();

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
        todoToEdit.title = formData.title;
        todoToEdit.description = formData.description;
        todoToEdit.completionDatePlanned = formData.completionDatePlanned;

        await this.owner.saveToDoAsync(todoToEdit);
      });

      modal.close();
    });

    const modal = this.overlayService.createModalEditForm(form);
    modal.title = 'Редактирование';
    modal.content = form;
  }
}