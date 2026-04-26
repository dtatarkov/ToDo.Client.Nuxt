import { ToDosService } from "../interfaces/todosService";
import { ToDo } from "../interfaces/todo";
import { ToDosOwner } from "../interfaces/todosOwner";
import { FormFactory } from '@/modules/forms/interfaces/formFactory';
import { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import type { Observable } from '@/modules/shared/interfaces/observable';
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

  override getAllToDosAsync(): Promise<Observable<ToDo[]>>
  {
    return this.owner.getAllToDosAsync();
  }

  override async updateToDosAsync(): Promise<void>
  {
    await this.owner.updateToDosAsync();
  }
}