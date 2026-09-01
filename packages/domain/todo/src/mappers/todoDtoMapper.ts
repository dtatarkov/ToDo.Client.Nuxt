import type { ToDoData } from '../types/todoData';
import type { ToDoAddData } from '../types/todoAddData';
import type { ToDoUpdateData } from '../types/todoUpdateData';
import type { ToDoGetDto } from '../types/todoGetDto';
import type { ToDoAddDto } from '../types/todoAddDto';
import type { ToDoUpdateDto } from '../types/todoUpdateDto';

export abstract class ToDoDtoMapper
{
    abstract mapDtoToData(dto: ToDoGetDto): ToDoData;
    abstract mapDataToAddDto(data: ToDoAddData): ToDoAddDto;
    abstract mapDataToUpdateDto(data: ToDoUpdateData): ToDoUpdateDto;
}