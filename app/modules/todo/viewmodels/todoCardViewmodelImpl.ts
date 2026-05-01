import { ToDoCardViewmodel, type ToDoCardViewmodelData, type ToDoCardViewmodelSetupContext } from "../interfaces/todoCardViewmodel";
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { useService } from '@/modules/shared/composables/useService';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { useObservableSubscription } from '@/modules/shared/composables/useObservableSubscription';
import type { ButtonIconViewmodel } from '@/modules/uikit/interfaces/buttonIconViewmodel';
import type { Action } from '@/modules/shared/types/action';
import { ObservableSource } from '@/modules/shared/entities/observableSource';

export class ToDoCardViewmodelImpl extends ToDoCardViewmodel
{
  readonly key = getUniqueId('todo-card');

  private readonly data = new ObservableSource<ToDoCardViewmodelData>({
    title: '',
    description: '',
    completionDateActual: undefined,
    completionDatePlanned: undefined,
  });

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

      this.setup?.({ editButton });

      useObservableSubscription(this.data, data =>
      {
        card.title = data.title;
        card.description = data.description;

        completionDateActualRow.content = datesService.formatDateOptional(data.completionDateActual);
        completionDatePlannedRow.content = datesService.formatDateOptional(data.completionDatePlanned);

        card.footer = !infoBlock.isEmpty ? infoBlock : undefined;
      });

      return () => h(card.component);
    }
  };

  constructor(
    private readonly setup?: Action<[ToDoCardViewmodelSetupContext]>,
  )
  {
    super();
  }

  override get title()
  {
    return this.data.value.title;
  }

  override set title(value: string)
  {
    this.data.mutate({ title: value });
  }

  override get description()
  {
    return this.data.value.description;
  }

  override set description(value: string)
  {
    this.data.mutate({ description: value });
  }

  override get completionDatePlanned()
  {
    return this.data.value.completionDatePlanned;
  }

  override set completionDatePlanned(value: Date | undefined)
  {
    this.data.mutate({ completionDatePlanned: value });
  }

  override get completionDateActual()
  {
    return this.data.value.completionDateActual;
  }

  override set completionDateActual(value: Date | undefined)
  {
    this.data.mutate({ completionDateActual: value });
  }
}