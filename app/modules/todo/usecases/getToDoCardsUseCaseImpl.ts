import { GetToDoCardsUseCase } from "../interfaces/getToDoCardsUseCase";
import { GetToDosUseCase } from "../interfaces/getToDosUseCase";
import { ToDoCardDataMapper } from "../interfaces/todoCardDataMapper";
import { dependency } from '@/modules/shared/decorators/dependency';
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';

@dependency(GetToDosUseCase)
@dependency(ToDoCardDataMapper)
export class GetToDoCardsUseCaseImpl extends GetToDoCardsUseCase
{
  constructor(
    private readonly getToDosUseCase: GetToDosUseCase,
    private readonly todoCardDataMapper: ToDoCardDataMapper
  )
  {
    super();
  }

  override execute(): Observable<ToDoCardDataWithIdentity[]>
  {
    const todos = this.getToDosUseCase.execute();

    const cards = new ObservableComputed(() =>
      todos.value.map(todo => this.todoCardDataMapper.mapToCardData(todo))
    );

    return cards;
  }
}