import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";
import { ToDo } from "../interfaces/todo";
import { ToDoBase } from "../entities/todoBase";
import type { DatesService } from '@/modules/shared/interfaces/datesService';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

export class ToDoDtoMapperImpl extends ToDoDtoMapper
{
  constructor(protected datesService: DatesService)
  {
    super();
  }

  mapToEntity(dto: ToDoGetDto): ToDo
  {
    const todo = new ToDoBase();

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