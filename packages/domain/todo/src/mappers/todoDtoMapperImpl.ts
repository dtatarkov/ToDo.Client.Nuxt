import { ToDoDtoMapper } from "./todoDtoMapper";
import type { ToDoGetDto } from "../types/todoGetDto";
import type { ToDoAddDto } from '../types/todoAddDto';
import type { ToDoUpdateDto } from '../types/todoUpdateDto';
import type { ToDoData } from '../types/todoData';
import type { ToDoAddData } from '../types/todoAddData';
import type { ToDoUpdateData } from '../types/todoUpdateData';
import { DateParser } from '@client/infrastructure-datetime';
import { dependency } from '@client/infrastructure-di';

@dependency(DateParser)
export class ToDoDtoMapperImpl extends ToDoDtoMapper
{
    constructor(
        private dateParser: DateParser,
    )
    {
        super();
    }

    override mapDtoToData(dto: ToDoGetDto): ToDoData
    {
        return {
            id: dto.id,
            title: dto.title,
            description: dto.description,
            completionDatePlanned: this.dateParser.fromStringOptional(dto.completionDatePlanned),
            completionDateActual: this.dateParser.fromStringOptional(dto.completionDateActual),
        };
    }

    override mapDataToAddDto(data: ToDoAddData): ToDoAddDto
    {
        return {
            title: data.title,
            description: data.description,
            completionDatePlanned: data.completionDatePlanned?.toISOString(),
        };
    }

    override mapDataToUpdateDto(data: ToDoUpdateData): ToDoUpdateDto
    {
        return {
            title: data.title,
            description: data.description,
            completionDatePlanned: data.completionDatePlanned?.toISOString(),
        };
    }
}
