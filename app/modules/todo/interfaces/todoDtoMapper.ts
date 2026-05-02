import type { ToDo } from "../interfaces/todo";
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";

export abstract class ToDoDtoMapper
{
  abstract mapToEntity(dto: ToDoGetDto): ToDo;
  
  abstract mapToUpdateDto(todo: ToDo): ToDoUpdateDto;
}