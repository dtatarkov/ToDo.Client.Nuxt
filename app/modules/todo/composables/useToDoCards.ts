import { useObservable } from '@/modules/shared/composables/useObservable';
import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDosService } from "../interfaces/todosService";
import { useService } from '../../shared/composables/useService';

export async function useToDoCards()
{
  const todosService = useService(ToDosService);
  const todoElementsFactory = useService(ToDoElementsFactory);

  const todos = useObservable(todosService.getAllToDos());
  const cards = computed(() => todos.value.map(todo => todoElementsFactory.createToDoCard(todo)));

  await todosService.updateToDosAsync();

  return {
    cards,
  };
}