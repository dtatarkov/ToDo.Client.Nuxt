import { computed, reactive } from 'vue';
import { useService } from '@/modules/shared/composables/useService';
import { useEventDrivenRef } from '@/modules/shared/composables/useEventDrivenRef';
import { ToDosOwner } from '../entities/todosOwner';
import type { ToDoCardData } from '../types/todoCardData';

export function useToDoCards()
{
    const todosOwner = useService(ToDosOwner);

    const todos = useEventDrivenRef(
        () => todosOwner.getAllToDos(),
        (callback, disposeToken) => todosOwner.onToDosChange(callback, disposeToken),
    );

    const todoCards = computed(() => todos.value.map<ToDoCardData>(todo => reactive({
        id: computed(() => todo.id),
        title: computed(() => todo.title),
        description: computed(() => todo.description),
        completionDateActual: computed(() => todo.completionDateActual),
        completionDatePlanned: computed(() => todo.completionDatePlanned),
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