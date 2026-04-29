import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";
import { ToDo } from "../interfaces/todo";
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { ToDoFactory } from "../interfaces/todoFactory";
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(DatesService)
@dependency(ToDoFactory)
export class ToDoDtoMapperImpl extends ToDoDtoMapper
{
  constructor(
    private datesService: DatesService,
    private todoFactory: ToDoFactory
  )
  {
    super();
  }

  mapToEntity(dto: ToDoGetDto): ToDo
  {
    const todo = this.todoFactory.create({
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