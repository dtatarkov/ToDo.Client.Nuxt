import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";
import { ToDo } from "../interfaces/todo";
import { ToDoBase } from "../entities/todoBase";
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(DatesService)
@dependency(FormViewmodelFactory)
@dependency(OverlayService)
export class ToDoDtoMapperImpl extends ToDoDtoMapper
{
  constructor(
    protected datesService: DatesService,
    protected formFactory: FormViewmodelFactory,
    protected overlayService: OverlayService
  )
  {
    super();
  }

  mapToEntity(dto: ToDoGetDto): ToDo
  {
    const todo = new ToDoBase(this.formFactory, this.overlayService);

    updatePropertiesWithData(todo, {
      ...dto,

      completionDateActual: this.datesService.fromStringOptional(dto.completionDateActual),
      completionDatePlanned: this.datesService.fromStringOptional(dto.completionDatePlanned),
    });

    return todo;
  }

  mapToUpdateDto(todo: ToDo): ToDoUpdateDto
  {
    return {
      title: todo.title,
      description: todo.description,
      completionDatePlanned: todo.completionDatePlanned?.toISOString()
    };
  }
}