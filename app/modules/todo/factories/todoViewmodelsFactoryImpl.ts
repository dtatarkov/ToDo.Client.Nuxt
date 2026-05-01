import { ToDoViewmodelsFactory } from "../interfaces/todoViewmodelsFactory";
import { ToDoCardViewmodel } from "../interfaces/todoCardViewmodel";
import type { ToDo } from "../interfaces/todo";
import { ToDoCardViewmodelImpl } from "../viewmodels/todoCardViewmodelImpl";
import { useSubscribable } from '@/modules/shared/composables/useSubscribable';
import { useObservableSubscription } from '@/modules/shared/composables/useObservableSubscription';

export class ToDoViewmodelsFactoryImpl extends ToDoViewmodelsFactory
{
  constructor()
  {
    super();
  }

  createToDoCard(todo: ToDo): ToDoCardViewmodel
  {
    const card = new ToDoCardViewmodelImpl(({ editButton }) =>
    {
      useObservableSubscription(todo.toObservableData(), todoData =>
      {
        card.title = todoData.title;
        card.description = todoData.description;
        card.completionDateActual = todoData.completionDateActual;
        card.completionDatePlanned = todoData.completionDatePlanned;
      });

      useSubscribable(editButton.click, () =>
      {
        todo.showEditDialog();
      });
    });

    return card;
  }
}