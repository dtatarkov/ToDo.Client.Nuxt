import { customRef } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { ToDosOwner } from '../entities/todosOwner';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { ReadonlyRefValueChangeException } from '@/modules/shared/exceptions/readonlyRefValueChangeException';
import type { ToDoCardData } from '../types/todoCardData';

export function useToDoCards()
{
    const todosOwner = useService(ToDosOwner);
    const disposeToken = useService(DisposeToken);

    const todos = customRef<ToDoCardData[]>((track, trigger) =>
    {
        todosOwner.onToDosChange(() =>
        {
            trigger();
        }, disposeToken);

        return {
            get()
            {
                track();
                return todosOwner.getAllToDos();
            },
            set()
            {
                throw new ReadonlyRefValueChangeException('todos');
            },
        };
    });

    const todoCards = computed(() => todos.value.map<ToDoCardData>(todo => reactive({
        id: computed(() => todo.id),
        title: computed(() => todo.title),
        description: computed(() => todo.description),
        completionDateActual: computed(() => todo.completionDateActual),
        completionDatePlanned: computed(() => todo.completionDatePlanned)
    })));

    async function initializeToDosAsync(): Promise<void>
    {
        await todosOwner.initializeToDosAsync();
    }

    function createToDo(): void
    {
        const todo = todosOwner.createToDo();
        todo.showForm();
    }

    async function editToDo(id: string): Promise<void>
    {
        const todo = await todosOwner.getToDoByIdAsync(id);

        if (todo)
        {
            todo.showForm();
        }
    }

    return { todoCards, initializeToDosAsync, createToDo, editToDo };
}