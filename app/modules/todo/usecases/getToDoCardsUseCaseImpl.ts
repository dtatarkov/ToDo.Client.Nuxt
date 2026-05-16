import { GetToDoCardsUseCase } from "../interfaces/getToDoCardsUseCase";
import { dependency } from '@/modules/shared/decorators/dependency';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
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

  override execute(): Observable<ToDoCardData[]>
  {
    const todos = this.todosOwner.getAllToDos();

    const cards = new ObservableComputed(() =>
      todos.value.map(todo => this.todoCardDataMapper.mapToCardData(todo))
    );

    return cards;
  }
}