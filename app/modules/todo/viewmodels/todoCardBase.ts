import { ToDoCard } from "../interfaces/todoCard";
import type { ToDo } from "../interfaces/todo";
import VToDoCard from "../components/VToDoCard.vue";
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { useObservable } from '@/modules/shared/composables/useObservable';
import { useService } from '@/modules/shared/composables/useService';

export class ToDoCardBase extends ToDoCard
{
  readonly key = getUniqueId('todo-card');

  readonly component = {
    setup: () =>
    {
      const datesService = useService(DatesService);
      const todoData = useObservable(this.todo.data);

      const onEditButtonClick = async () =>
      {
        this.todo.showEditDialog();
      };

      const completionDatePlanned = computed(() => datesService.formatDateOptional(todoData.value.completionDatePlanned));
      const completionDateActual = computed(() => datesService.formatDateOptional(todoData.value.completionDateActual));

      return () => h(VToDoCard, {
        title: todoData.value.title,
        description: todoData.value.description,
        completionDatePlanned: completionDatePlanned.value,
        completionDateActual: completionDateActual.value,

        onEditButtonClick,
      });
    }
  };

  constructor(
    protected todo: ToDo,
  )
  {
    super();
  }

  override get id()
  {
    return this.todo.id;
  }

  override get title()
  {
    return this.todo.title;
  }

  override get description()
  {
    return this.todo.description;
  }

  override get completionDatePlanned()
  {
    return this.todo.completionDatePlanned;
  }

  override get completionDateActual()
  {
    return this.todo.completionDateActual;
  }
}