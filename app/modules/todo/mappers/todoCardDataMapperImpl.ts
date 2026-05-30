import { ToDoCardDataMapper } from "./todoCardDataMapper";
import type { ToDoData } from '../types/todoData';
import type { ToDoCardData } from '../types/todoCardData';
import { reactive, computed } from 'vue';

export class ToDoCardDataMapperImpl extends ToDoCardDataMapper
{
  mapToCardData(todo: ToDoData): ToDoCardData
  {
    const data = reactive({
      id: computed(() => todo.id),
      title: computed(() => todo.title),
      description: computed(() => todo.description),
      completionDateActual: computed(() => todo.completionDateActual),
      completionDatePlanned: computed(() => todo.completionDatePlanned)
    });

    return data;
  }
}