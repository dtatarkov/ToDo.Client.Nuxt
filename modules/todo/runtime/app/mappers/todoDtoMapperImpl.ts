import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";
import { ToDo } from "../interfaces/todo";
import { ToDoBase } from "../entities/todoBase";

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
}