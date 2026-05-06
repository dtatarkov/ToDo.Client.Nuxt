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
import type { ShowEditToDoDialogUseCase } from '../interfaces/showEditToDoDialogUseCase';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { ButtonIconViewmodel } from '@/modules/uikit/interfaces/buttonIconViewmodel';

export class ToDoCardViewmodelImpl extends ToDoCardViewmodel
{
  private readonly card: CardViewmodel;

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

    this.card = this.createCard();
  }

  override setSource(source: MaybeObservable<ToDoCardViewmodelData>)
  {
    this.sourceWrapper.value = toObservable(source);
  }

  private createCard(): CardViewmodel
  {
    const card = this.uikitFactory.createCard();
    card.title.value = () => this.source.value.title;
    card.description.value = () => this.source.value.description;


    const editButton = this.createEditButton();
    card.actions.value = () => !this.isNew() ? [editButton] : [];

    const infoBlock = this.createInfoBlock();
    card.footer.value = () => !infoBlock.isEmpty ? infoBlock : undefined;

    return card;
  }

  private createInfoBlock(): InfoBlockViewmodel
  {
    const infoBlock = this.uikitFactory.createInfoBlock();

    infoBlock.createRow({
      label: 'Выполнено',
      content: () => this.datesService.formatDateOptional(this.source.value.completionDateActual)
    });

    infoBlock.createRow({
      label: 'Выполнить до',
      content: () => this.datesService.formatDateOptional(this.source.value.completionDatePlanned)
    });

    return infoBlock;
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