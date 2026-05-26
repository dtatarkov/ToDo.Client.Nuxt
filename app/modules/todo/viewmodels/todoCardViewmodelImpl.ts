import { ToDoCardViewmodel } from "../interfaces/todoCardViewmodel";
import type { DatesService } from '@/modules/shared/interfaces/datesService';
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import type { CardViewmodel } from '@/modules/uikit/interfaces/cardViewmodel';
import type { InfoBlockViewmodel } from '@/modules/uikit/interfaces/infoBlockViewmodel';
import type { EditToDoUseCase } from '../usecases/editToDoUseCase';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import type { ButtonIconViewmodel } from '@/modules/uikit/interfaces/buttonIconViewmodel';
import { ReactiveFieldVue } from '@/modules/shared/entities/reactiveFieldVue';

export class ToDoCardViewmodelImpl extends ToDoCardViewmodel
{
  private readonly card: CardViewmodel;

  readonly key = getUniqueId('todo-card');

  readonly component = {
    setup: () =>
    {
      return () => h(this.card.component);
    }
  };

  readonly id = new ReactiveFieldVue('');
  readonly title = new ReactiveFieldVue('');
  readonly description = new ReactiveFieldVue('');
  readonly completionDateActual = new ReactiveFieldVue<Date | undefined>(undefined);
  readonly completionDatePlanned = new ReactiveFieldVue<Date | undefined>(undefined);

  constructor(
    private readonly uikitFactory: UIKitViewmodelsFactory,
    private readonly datesService: DatesService,
    private readonly stringsService: StringsService,
    private readonly showEditToDoDialogUseCase: EditToDoUseCase,
  )
  {
    super();

    this.card = this.createCard();
  }

  private createCard(): CardViewmodel
  {
    const card = this.uikitFactory.createCard();
    card.title.value = () => this.title.value;
    card.description.value = () => this.description.value;


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
      content: () => this.datesService.formatDateOptional(this.completionDateActual.value)
    });

    infoBlock.createRow({
      label: 'Выполнить до',
      content: () => this.datesService.formatDateOptional(this.completionDatePlanned.value)
    });

    return infoBlock;
  }

  private createEditButton(): ButtonIconViewmodel
  {
    const editButton = this.uikitFactory.createButtonIcon({
      icon: 'i-heroicons-pencil-square',

      click: () =>
      {
        this.showEditToDoDialogUseCase.executeAsync(this.id.value);
      },
    });

    return editButton;
  }

  private isNew()
  {
    return this.stringsService.isStringEmpty(this.id.value);
  }
}