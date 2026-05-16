import { GetToDoCardsUseCase } from "../interfaces/getToDoCardsUseCase";
import { dependency } from '@/modules/shared/decorators/dependency';
import { ToDoCardDataMapper } from '../interfaces/todoCardDataMapper';
import type { ToDoCardData } from '../types/todoCardData';
import { ToDosOwner } from '../interfaces/todosOwner';

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

  override execute(): ToDoCardData[]
  {
    const todos = this.todosOwner.getAllToDos();
    const cards = todos.map(todo => this.todoCardDataMapper.mapToCardData(todo));

    return cards;
  }
}