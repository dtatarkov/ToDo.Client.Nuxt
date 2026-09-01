import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToDoDtoMapperImpl } from '../../src/mappers/todoDtoMapperImpl';
import type { ToDoGetDto } from '../../src/types/todoGetDto';
import type { ToDoAddData } from '../../src/types/todoAddData';
import type { ToDoUpdateData } from '../../src/types/todoUpdateData';
import { ToDoStateType } from '../../src/enums/todoStateType';
import { dateParserMock } from '@client/infrastructure-datetime/mocks';

let mapper: ToDoDtoMapperImpl;

beforeEach(() =>
{
    vi.resetAllMocks();
    mapper = new ToDoDtoMapperImpl(dateParserMock);
});

describe('mapDtoToData', () =>
{
    it('should map dto to data', () =>
    {
        const dto: ToDoGetDto = {
            id: '123',
            title: 'Test Title',
            description: 'Test Description',
            completionDatePlanned: '2025-01-15T10:00:00.000Z',
            completionDateActual: '2025-01-16T12:00:00.000Z',
            state: ToDoStateType.Initial,
        };

        const result = mapper.mapDtoToData(dto);

        expect(result.id).toBe(dto.id);
        expect(result.title).toBe(dto.title);
        expect(result.description).toBe(dto.description);
        expect(dateParserMock.fromStringOptional).toHaveBeenCalledWith(dto.completionDatePlanned);
        expect(dateParserMock.fromStringOptional).toHaveBeenCalledWith(dto.completionDateActual);
    });
});

describe('mapDataToAddDto', () =>
{
    it('should map data to add DTO with completionDatePlanned', () =>
    {
        const data: ToDoAddData = {
            title: 'New Task',
            description: 'New description',
            completionDatePlanned: new Date('2025-02-20T09:30:00.000Z'),
        };

        const result = mapper.mapDataToAddDto(data);

        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.completionDatePlanned).toBe(data.completionDatePlanned?.toISOString());
    });

    it('should map data to add DTO without completionDatePlanned', () =>
    {
        const data: ToDoAddData = {
            title: 'No Date Task',
            description: '',
            completionDatePlanned: undefined,
        };

        const result = mapper.mapDataToAddDto(data);

        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.completionDatePlanned).toBeUndefined();
    });
});

describe('mapDataToUpdateDto', () =>
{
    it('should map data to update DTO with completionDatePlanned', () =>
    {
        const data: ToDoUpdateData = {
            id: 'upd-1',
            title: 'Updated Task',
            description: 'Updated description',
            completionDatePlanned: new Date('2025-04-10T16:45:00.000Z'),
        };

        const result = mapper.mapDataToUpdateDto(data);

        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.completionDatePlanned).toBe(data.completionDatePlanned?.toISOString());
    });

    it('should map data to update DTO without completionDatePlanned', () =>
    {
        const data: ToDoUpdateData = {
            id: 'upd-2',
            title: 'Update No Date',
            description: '',
            completionDatePlanned: undefined,
        };

        const result = mapper.mapDataToUpdateDto(data);

        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.completionDatePlanned).toBeUndefined();
    });
});
