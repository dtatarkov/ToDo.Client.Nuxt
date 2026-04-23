import { useObservable } from '@shared/composables/useObservable';
import { getService } from '@shared/utils/getService';
import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDosService } from "../interfaces/todosService";

export async function useToDoCards()
{
  const todosService = getService(ToDosService);
  const todoElementsFactory = getService(ToDoElementsFactory);

  const todos = useObservable(todosService.getAllToDos());
  const cards = computed(() => todos.value.map(todo => todoElementsFactory.createToDoCard(todo)));

  await todosService.updateToDosAsync();

  return {
    cards,
  };
}