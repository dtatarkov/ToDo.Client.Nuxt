import { GetToDoCardsUseCase } from "./getToDoCardsUseCase";
import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDoCardDataMapper } from '../mappers/todoCardDataMapper';
import type { ToDoCardData } from '../types/todoCardData';
import { ToDosOwner } from '../entities/todosOwner';
import { type Ref, computed } from 'vue';

@dependency(ToDosOwner)
@dependency(ToDoCardDataMapper)
export class GetToDoCardsUseCaseImpl extends GetToDoCardsUseCase
{
  constructor(
    private readonly todosOwner: ToDosOwner,
    private readonly todoCardDataMapper: ToDoCardDataMapper
  )
  {
    super();
  }

  override execute(): Ref<ToDoCardData[]>
  {
    const todos = this.todosOwner.getAllToDos();
    const cards = computed(() => todos.map(todo => this.todoCardDataMapper.mapToCardData(todo)));

    return cards;
  }
}