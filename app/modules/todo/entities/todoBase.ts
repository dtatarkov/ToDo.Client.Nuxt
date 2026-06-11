import { ToDo } from "./todo";
import type { ToDoData } from '../types/todoData';
import type { ToDosOwner } from './todosOwner';
import { shallowReactive, type Reactive } from 'vue';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import { isStringEmpty } from '@/modules/shared/utils/isStringEmpty';
import type { FormFactory } from '@/modules/forms/factories/formFactory';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Modal } from '@/modules/overlay/entities/modal';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

export class ToDoBase extends ToDo
{
  private ownerInternal: ToDosOwner | undefined;

  private dataInternal = shallowReactive(<ToDoData>{
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  });

  constructor(
    private overlay: Overlay,
    private formFactory: FormFactory,
  )
  {
    super();
  }

  private schemeCommon = {
    id: {
      type: EntityFieldType.hidden,
    },

    title: {
      type: EntityFieldType.string,
      label: 'Название задачи',
      placeholder: 'Введите название задачи',
      isRequired: true,
    },

    description: {
      type: EntityFieldType.string,
      label: 'Описание задачи',
      placeholder: 'Введите описание задачи',
      isLong: true,
    },

    completionDatePlanned: {
      type: EntityFieldType.datetime,
      label: 'Плановая дата выполнения',
    },

    completionDateActual: {
      type: EntityFieldType.hidden,
    }
  } satisfies EntityScheme<Partial<ToDoData>>;

  private addScheme: EntityScheme<ToDoData> = {
    ...this.schemeCommon,

    // completionDateActual: {
    //   type: EntityFieldType.hidden,
    // }
  };

  private editScheme: EntityScheme<ToDoData> = {
    ...this.schemeCommon,

    // completionDateActual: {
    //   type: EntityFieldType.datetime,
    //   label: 'Фактическая дата выполнения',
    // }
  };

  get owner(): ToDosOwner | undefined
  {
    return this.ownerInternal;
  }

  set owner(value: ToDosOwner | undefined)
  {
    this.ownerInternal = value;
  }

  get id(): string
  {
    return this.dataInternal.id;
  }

  get title(): string
  {
    return this.dataInternal.title;
  }

  get description(): string
  {
    return this.dataInternal.description;
  }

  get completionDatePlanned(): Date | undefined
  {
    return this.dataInternal.completionDatePlanned;
  }

  get completionDateActual(): Date | undefined
  {
    return this.dataInternal.completionDateActual;
  }

  set id(value: string)
  {
    this.dataInternal.id = value;
  }

  set title(value: string)
  {
    this.dataInternal.title = value;
  }

  set description(value: string)
  {
    this.dataInternal.description = value;
  }

  set completionDatePlanned(value: Date | undefined)
  {
    this.dataInternal.completionDatePlanned = value;
  }

  set completionDateActual(value: Date | undefined)
  {
    this.dataInternal.completionDateActual = value;
  }

  get isNew()
  {
    return isStringEmpty(this.id);
  }

  override getAddScheme(): EntityScheme<ToDoData>
  {
    return this.addScheme;
  }

  override getEditScheme(): EntityScheme<ToDoData>
  {
    return this.editScheme;
  }

  override getData(): Reactive<ToDoData>
  {
    return this.dataInternal;
  }

  override clone(): ToDo
  {
    const todo = new ToDoBase(this.overlay, this.formFactory);

    todo.id = this.id;
    todo.title = this.title;
    todo.description = this.description;
    todo.completionDatePlanned = this.completionDatePlanned;
    todo.completionDateActual = this.completionDateActual;
    todo.owner = this.owner;

    return todo;
  }

  override async saveAsync(): Promise<void>
  {
    if (!this.owner)
    {
      throw new Error('Owner is not available');
    }

    await this.ownerInternal?.saveToDoAsync(this);
  }

  override showForm(): Modal
  {
    return this.isNew
      ? this.showAddForm()
      : this.showEditForm();
  }

  private showAddForm(): Modal
  {
    const form = this.formFactory.create<ToDoData>({
      callbacks: {
        submit: async data =>
        {
          updatePropertiesWithData(this, data);
          await this.saveAsync();
        }
      }
    });

    form.setElementsFromScheme(this.getAddScheme());
    form.setData(this.getData());

    return this.overlay.createModal({
      title: 'Создать задачу',
      content: form,

      buttonConfirm: configurator => configurator
        .withCommand(form.getSubmitCommand())
        .asCreateButton(),

      buttonCancel: true,
    });
  }

  private showEditForm(): Modal
  {
    const form = this.formFactory.create<ToDoData>({
      callbacks: {
        submit: async data =>
        {
          updatePropertiesWithData(this, data);
          await this.saveAsync();
        }
      }
    });

    form.setElementsFromScheme(this.getEditScheme());
    form.setData(this.getData());

    return this.overlay.createModal({
      title: 'Изменить задачу',
      content: form,

      buttonConfirm: configurator => configurator
        .withCommand(form.getSubmitCommand())
        .asEditButton(),

      buttonCancel: true,
    });
  }
}