import { ToDosService } from "../interfaces/todosService";
import { ToDo } from "../interfaces/todo";
import type { ToDosOwner } from "../interfaces/todosOwner";
import type { Observable } from "@shared/interfaces/observable";

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
    let todo = this.owner.getToDoById(todoId);

    if (!todo)
    {
      throw new Error(`ToDo(${ todoId }) not found`);
    }

    const form = this.formFactory.create<ToDo>();

    form.setElements({
      title: {
        type       : FormElementType.inputText,
        label      : 'Название задачи',
        placeholder: 'Введите название задачи',
      },

      description: {
        type       : FormElementType.textarea,
        label      : 'Описание задачи',
        placeholder: 'Введите описание задачи'
      },

      completionDatePlanned: {
        type : FormElementType.inputDateTime,
        label: 'Плановая дата выполнения',
      }
    });

    form.setData(todo);

    const modal   = this.overlayService.createModal();
    modal.title   = 'Редактирование';
    modal.content = form;
  }
}