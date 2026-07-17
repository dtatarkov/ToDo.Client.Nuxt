import { ToDoDtoMapper, type ToDo, type ToDoGetDto, type ToDosRepository } from '@client/domain-todo';

export function useToDosRepository(): ToDosRepository
{
    const config = useRuntimeConfig();
    const todoDtoMapper = useService(ToDoDtoMapper);
    const { load } = useSSRLoader();

    async function getAllToDosAsync(): Promise<ToDo[]>
    {
        const dtos = await load('todos', () =>
            $fetch<ToDoGetDto[]>(`${config.public.apiBaseUrl}/todos`, {
                method: 'GET',
                credentials: 'include'
            })
        );

        const todos = dtos.map(dto => todoDtoMapper.mapToEntity(dto));

        return todos;
    }

    async function addToDoAsync(todo: ToDo): Promise<void>
    {
        if (!todo.isNew)
        {
            throw new Error('todo is not new');
        }

        const addDto = todoDtoMapper.mapToAddDto(todo);

        const dto: ToDoGetDto = await $fetch(`${config.public.apiBaseUrl}/todos`, {
            method: 'POST',
            credentials: 'include',
            body: addDto
        });

        const addedToDo = todoDtoMapper.mapToEntity(dto);
        todo.setData(addedToDo.getData());
    }

    async function updateToDoAsync(todo: ToDo): Promise<void>
    {
        const updateDto = todoDtoMapper.mapToUpdateDto(todo);

        const dto: ToDoGetDto = await $fetch(`${config.public.apiBaseUrl}/todos/${todo.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: updateDto
        });

        const updatedTodo = todoDtoMapper.mapToEntity(dto);
        todo.setData(updatedTodo.getData());
    }

    return { getAllToDosAsync, addToDoAsync, updateToDoAsync };
}
