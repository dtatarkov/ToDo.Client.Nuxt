import { ToDoCardViewmodel, type ToDoCardViewmodelData } from "../interfaces/todoCardViewmodel";
import type { DatesService } from '@/modules/shared/interfaces/datesService';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { toObservable } from '@/modules/shared/utils/toObservable';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
import type { CardViewmodel } from '@/modules/uikit/interfaces/cardViewmodel';
import type { InfoBlockViewmodel } from '@/modules/uikit/interfaces/infoBlockViewmodel';
import type { InfoRowViewmodel } from '@/modules/uikit/interfaces/infoRowViewmodel';
import type { ShowEditToDoDialogUseCase } from '../interfaces/showEditToDoDialogUseCase';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { ButtonIconViewmodel } from '@/modules/uikit/interfaces/buttonIconViewmodel';
import { useObservableSubscription } from '@/modules/shared/composables/useObservableSubscription';

export class ToDoCardViewmodelImpl extends ToDoCardViewmodel
{
  private readonly card: CardViewmodel;
  private readonly editButton: ButtonIconViewmodel;
  private readonly infoBlock: InfoBlockViewmodel;
  private readonly completionDateActualRow: InfoRowViewmodel;
  private readonly completionDatePlannedRow: InfoRowViewmodel;

  private sourceWrapper = new ObservableSource<Observable<ToDoCardViewmodelData>>(new ObservableSource({
    id: '',
    title: '',
    description: '',
    completionDateActual: undefined,
    completionDatePlanned: undefined,
  }));

  private source: Observable<ToDoCardViewmodelData> = new ObservableComputed(() => this.sourceWrapper.value.value);

  readonly key = getUniqueId('todo-card');

  readonly component = {
    setup: () =>
    {
      useObservableSubscription(this.source, () =>
      {
        this.updateCard();
      });

      this.updateCard();

      return () => h(this.card.component);
    }
  };

  constructor(
    private readonly uikitFactory: UIKitViewmodelsFactory,
    private readonly datesService: DatesService,
    private readonly stringsService: StringsService,
    private readonly showEditToDoDialogUseCase: ShowEditToDoDialogUseCase,
  )
  {
    super();

    this.card = this.uikitFactory.createCard();
    this.editButton = this.createEditButton();
    this.infoBlock = this.uikitFactory.createInfoBlock();
    this.completionDateActualRow = this.infoBlock.createRow({ label: 'Выполнено' });
    this.completionDatePlannedRow = this.infoBlock.createRow({ label: 'Выполнить до' });
  }

  override setSource(source: MaybeObservable<ToDoCardViewmodelData>)
  {
    this.sourceWrapper.value = toObservable(source);
  }

  private updateCard()
  {
    this.card.title.value = () => this.source.value.title;
    this.card.description.value = () => this.source.value.description;

    this.completionDateActualRow.content = this.datesService.formatDateOptional(this.source.value.completionDateActual);
    this.completionDatePlannedRow.content = this.datesService.formatDateOptional(this.source.value.completionDatePlanned);

    this.card.actions.value = () => !this.isNew() ? [this.editButton] : [];
    this.card.footer.value = () => !this.infoBlock.isEmpty ? this.infoBlock : undefined;
  }

  private createEditButton(): ButtonIconViewmodel
  {
    const editButton = this.uikitFactory.createButtonIcon({
      icon: 'i-heroicons-pencil-square',

      click: () =>
      {
        this.showEditToDoDialogUseCase.executeAsync(this.source.value.id);
      },
    });

    return editButton;
  }

  private isNew()
  {
    return this.stringsService.isStringEmpty(this.source.value.id);
  }
}