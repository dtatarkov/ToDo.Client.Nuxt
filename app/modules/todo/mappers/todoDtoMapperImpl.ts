import { ToDoDtoMapper } from "./todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";
import type { ToDo } from "../entities/todo";
import { DatesService } from '@/modules/shared/services/datesService';
import { ToDoFactory } from "../factories/todoFactory";
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDoAddDto } from '../types/todoAddDto';

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
    const dto = {
      title: todo.title,
      description: todo.description,
      completionDatePlanned: todo.completionDatePlanned?.toISOString()
    };

    return dto;
  }

  mapToAddDto(todo: ToDo): ToDoAddDto
  {
    const dto = {
      title: todo.title,
      description: todo.description,
      completionDatePlanned: todo.completionDatePlanned?.toISOString()
    };

    return dto;
  }
}