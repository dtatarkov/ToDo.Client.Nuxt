import type { ToDo } from "../entities/todo";
import type { ToDoAddDto } from '../types/todoAddDto';
import type { ToDoGetDto } from "../types/todoGetDto";
import type { ToDoUpdateDto } from "../types/todoUpdateDto";

export abstract class ToDoDtoMapper
{
  abstract mapToEntity(dto: ToDoGetDto): ToDo;
  abstract mapToUpdateDto(todo: ToDo): ToDoUpdateDto;
  abstract mapToAddDto(todo: ToDo): ToDoAddDto;
}