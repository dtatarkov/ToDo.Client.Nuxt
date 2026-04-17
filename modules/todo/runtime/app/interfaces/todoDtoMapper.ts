import { ToDo } from "../interfaces/todo";
import type { ToDoGetDto } from "../types/toDoGetDto";

export abstract class ToDoDtoMapper
{
  abstract mapToEntity(dto: ToDoGetDto): ToDo;
}