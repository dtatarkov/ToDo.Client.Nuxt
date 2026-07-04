import type { ToDo } from "../entities/todo";
import type { ToDoAddDto } from '../types/toDoAddDto';
import type { ToDoGetDto } from "../types/toDoGetDto";
import type { ToDoUpdateDto } from "../types/toDoUpdateDto";

export abstract class ToDoDtoMapper
{
  abstract mapToEntity(dto: ToDoGetDto): ToDo;
  abstract mapToUpdateDto(todo: ToDo): ToDoUpdateDto;
  abstract mapToAddDto(todo: ToDo): ToDoAddDto;
}