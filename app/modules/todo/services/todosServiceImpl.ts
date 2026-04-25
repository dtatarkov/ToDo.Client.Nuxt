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
}