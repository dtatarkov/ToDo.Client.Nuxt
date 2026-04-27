import { ToDoCardViewmodel } from "../interfaces/todoCardViewmodel";
import type { ToDo } from "../interfaces/todo";
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { useService } from '@/modules/shared/composables/useService';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { useObservableSubscription } from '@/modules/shared/composables/useObservableSubscription';
import { useSubscribable } from '@/modules/shared/composables/useSubscribable';

export class ToDoCardViewmodelImpl extends ToDoCardViewmodel
{
  readonly key = getUniqueId('todo-card');

  readonly component = {
    setup: () =>
    {
      const datesService = useService(DatesService);
      const uikitFactory = useService(UIKitViewmodelsFactory);

      const card = uikitFactory.createCard();

      const infoBlock = uikitFactory.createInfoBlock();
      const completionDateActualRow = infoBlock.createRow({ label: 'Выполнено' });
      const completionDatePlannedRow = infoBlock.createRow({ label: 'Выполнить до' });

      const editButton = uikitFactory.createButtonIcon({ icon: 'i-heroicons-pencil-square' });

      card.actions = [editButton];
      card.footer = infoBlock;

      useObservableSubscription(this.todo.data, todoData =>
      {
        card.title = todoData.title;
        card.description = todoData.description;

        completionDateActualRow.content = datesService.formatDateOptional(todoData.completionDateActual);
        completionDatePlannedRow.content = datesService.formatDateOptional(todoData.completionDatePlanned);
      });

      useSubscribable(editButton.click, () =>
      {
        this.todo.showEditDialog();
      });

      return () => h(card.component);
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