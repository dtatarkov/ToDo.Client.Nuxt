import { ToDoCard } from "../interfaces/todoCard";
import type { ToDosService } from "../interfaces/todosService";
import VToDoCard from "../components/VToDoCard.vue";

export class ToDoCardBase extends ToDoCard
{
  protected data = reactive({
    id: '',
    title: '',
    description: '',
    completionDatePlanned: <Date | undefined>undefined,
    completionDateActual: <Date | undefined>undefined,
  });

  readonly key = getUniqueId('todo-card');

  readonly component = {
    setup: () =>
    {
      const onEditButtonClick = async () =>
      {
        await this.todosService.editToDoAsync(this.id);
      };

      const completionDatePlanned = computed(() => this.datesService.formatDateOptional(this.completionDatePlanned));
      const completionDateActual = computed(() => this.datesService.formatDateOptional(this.completionDateActual));

      return () => h(VToDoCard, {
        ...this.data,

        completionDatePlanned: completionDatePlanned.value,
        completionDateActual: completionDateActual.value,

        onEditButtonClick,
      });
    }
  };

  constructor(
    protected todosService: ToDosService,
    protected datesService: DatesService
  )
  {
    super();
  }

  override get id()
  {
    return this.data.id;
  }

  override get title()
  {
    return this.data.title;
  }

  override get description()
  {
    return this.data.description;
  }

  override get completionDatePlanned()
  {
    return this.data.completionDatePlanned;
  }

  override get completionDateActual()
  {
    return this.data.completionDateActual;
  }

  override set id(value)
  {
    this.data.id = value;
  }

  override set title(value)
  {
    this.data.title = value;
  }

  override set description(value)
  {
    this.data.description = value;
  }

  override set completionDatePlanned(value)
  {
    this.data.completionDatePlanned = value;
  }

  override set completionDateActual(value)
  {
    this.data.completionDateActual = value;
  }
}