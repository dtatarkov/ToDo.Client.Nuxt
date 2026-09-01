import { ToDoDtoMapper, type ToDoGetDto, type ToDosRepository, type ToDoData, type ToDoAddData, type ToDoUpdateData } from '@client/domain-todo';

export function useToDosRepository(): ToDosRepository
{
    const config = useRuntimeConfig();
    const todoDtoMapper = useService(ToDoDtoMapper);
    const { load } = useSSRLoader();

    async function getAllToDosAsync(): Promise<ToDoData[]>
    {
        const dtos = await load('todos', () =>
            $fetch<ToDoGetDto[]>(`${config.public.apiBaseUrl}/todos`, {
                method: 'GET',
                credentials: 'include'
            })
        );

        const data = dtos.map(dto => todoDtoMapper.mapDtoToData(dto));

        return data;
    }

    async function addToDoAsync(data: ToDoAddData): Promise<ToDoData>
    {
        const addDto = todoDtoMapper.mapDataToAddDto(data);

        const dto: ToDoGetDto = await $fetch(`${config.public.apiBaseUrl}/todos`, {
            method: 'POST',
            credentials: 'include',
            body: addDto
        });

        const result = todoDtoMapper.mapDtoToData(dto);

        return result;
    }

    async function updateToDoAsync(data: ToDoUpdateData): Promise<ToDoData>
    {
        const updateDto = todoDtoMapper.mapDataToUpdateDto(data);

        const dto: ToDoGetDto = await $fetch(`${config.public.apiBaseUrl}/todos/${data.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: updateDto
        });

        const result = todoDtoMapper.mapDtoToData(dto);

        return result;
    }

    return { getAllToDosAsync, addToDoAsync, updateToDoAsync };
}