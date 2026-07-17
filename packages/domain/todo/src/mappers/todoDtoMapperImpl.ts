import { ToDoDtoMapper } from "./todoDtoMapper";
import type { ToDoGetDto } from "../types/todoGetDto";
import type { ToDoUpdateDto } from "../types/todoUpdateDto";
import type { ToDo } from "../entities/todo";
import { DateParser } from '@client/infrastructure-datetime';
import { ToDoFactory } from "../factories/todoFactory";
import type { ToDoAddDto } from '../types/todoAddDto';
import { dependency } from '@client/infrastructure-di';

@dependency(DateParser)
@dependency(ToDoFactory)
export class ToDoDtoMapperImpl extends ToDoDtoMapper
{
  constructor(
    private dateParser: DateParser,
    private todoFactory: ToDoFactory
  )
  {
    super();
  }

  mapToEntity(dto: ToDoGetDto): ToDo
  {
    const todo = this.todoFactory.create({
      ...dto,

      completionDateActual: this.dateParser.fromStringOptional(dto.completionDateActual),
      completionDatePlanned: this.dateParser.fromStringOptional(dto.completionDatePlanned),
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