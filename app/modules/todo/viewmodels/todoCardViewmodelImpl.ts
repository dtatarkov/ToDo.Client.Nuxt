import { ToDoCardViewmodel, type ToDoCardViewmodelData } from "../interfaces/todoCardViewmodel";
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { useService } from '@/modules/shared/composables/useService';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { useObservableSubscription } from '@/modules/shared/composables/useObservableSubscription';
import type { Action } from '@/modules/shared/types/action';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { toObservable } from '@/modules/shared/utils/toObservable';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
import { HandlerWrapper } from '@/modules/shared/entities/handlerWrapper';

export class ToDoCardViewmodelImpl extends ToDoCardViewmodel
{
  readonly key = getUniqueId('todo-card');

  private sourceWrapper = new ObservableSource<Observable<ToDoCardViewmodelData>>(new ObservableSource({
    title: '',
    description: '',
    completionDateActual: undefined,
    completionDatePlanned: undefined,
  }));

  private source: Observable<ToDoCardViewmodelData> = new ObservableComputed(() => this.sourceWrapper.value.value);
  private clickHandler = new HandlerWrapper();

  readonly component = {
    setup: () =>
    {
      const datesService = useService(DatesService);
      const uikitFactory = useService(UIKitViewmodelsFactory);

      const card = uikitFactory.createCard();

      const infoBlock = uikitFactory.createInfoBlock();
      const completionDateActualRow = infoBlock.createRow({ label: 'Выполнено' });
      const completionDatePlannedRow = infoBlock.createRow({ label: 'Выполнить до' });

      const editButton = uikitFactory.createButtonIcon({
        icon: 'i-heroicons-pencil-square',
        click: () => this.clickHandler.handle(),
      });

      card.actions = [editButton];
      card.footer = infoBlock;

      useObservableSubscription(this.source, source =>
      {
        card.title = source.title;
        card.description = source.description;

        completionDateActualRow.content = datesService.formatDateOptional(source.completionDateActual);
        completionDatePlannedRow.content = datesService.formatDateOptional(source.completionDatePlanned);

        card.footer = !infoBlock.isEmpty ? infoBlock : undefined;
      });

      return () => h(card.component);
    }
  };

  override setSource(source: MaybeObservable<ToDoCardViewmodelData>)
  {
    this.sourceWrapper.value = toObservable(source);
  }

  override setClickHandler(handler: Action)
  {
    this.clickHandler.setHandler(handler);
  }
}