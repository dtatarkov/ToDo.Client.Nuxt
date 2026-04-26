import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDosService } from "../interfaces/todosService";
import { useService } from '../../shared/composables/useService';
import { useAsyncObservable } from '@/modules/shared/composables/useAsyncObservable';

export async function useToDoCards()
{
  const todosService = useService(ToDosService);
  const todoElementsFactory = useService(ToDoElementsFactory);

  const todos = await useAsyncObservable(todosService.getAllToDosAsync());
  const cards = computed(() => todos.value.map(todo => todoElementsFactory.createToDoCard(todo)));

  return {
    cards,
  };
}