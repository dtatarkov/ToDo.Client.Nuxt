import { ToDo, type ToDoData } from "../interfaces/todo";
import { ToDosOwner } from '../interfaces/todosOwner';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import { Observable } from '@/modules/shared/interfaces/observable';
import { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import { EffectsContainerBase } from '@/modules/shared/entities/effectsContainerBase';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';

export class ToDoBase extends ToDo
{
  private _owner: ToDosOwner | undefined;

  private _data = new ObservableSource<ToDoData>({
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  });

  constructor(
    private _formFactory: FormViewmodelFactory,
    private _overlayService: OverlayService,
    private _stringsService: StringsService,
  )
  {
    super();
  }

  get owner(): ToDosOwner | undefined
  {
    return this._owner;
  }

  set owner(value: ToDosOwner | undefined)
  {
    this._owner = value;
  }

  get data(): Observable<ToDoData>
  {
    return this._data;
  }

  get id(): string
  {
    return this._data.value.id;
  }

  get title(): string
  {
    return this._data.value.title;
  }

  get description(): string
  {
    return this._data.value.description;
  }

  get completionDatePlanned(): Date | undefined
  {
    return this._data.value.completionDatePlanned;
  }

  get completionDateActual(): Date | undefined
  {
    return this._data.value.completionDateActual;
  }

  set id(value: string)
  {
    this._data.value = { ...this._data.value, id: value };
  }

  set title(value: string)
  {
    this._data.value = { ...this._data.value, title: value };
  }

  set description(value: string)
  {
    this._data.value = { ...this._data.value, description: value };
  }

  set completionDatePlanned(value: Date | undefined)
  {
    this._data.value = { ...this._data.value, completionDatePlanned: value };
  }

  set completionDateActual(value: Date | undefined)
  {
    this._data.value = { ...this._data.value, completionDateActual: value };
  }

  get isNew()
  {
    return this._stringsService.isStringEmpty(this.id);
  }

  getData(): ToDoData
  {
    return {
      ...this._data.value
    };
  }

  clone(): ToDo
  {
    const todo = new ToDoBase(this._formFactory, this._overlayService, this._stringsService);

    todo.id = this.id;
    todo.title = this.title;
    todo.description = this.description;
    todo.completionDatePlanned = this.completionDatePlanned;
    todo.completionDateActual = this.completionDateActual;
    todo.owner = this.owner;

    return todo;
  }

  async saveAsync(): Promise<void> 
  {
    if (!this.owner)
    {
      throw new Error('Owner is not available');
    }

    await this._owner?.saveToDoAsync(this);
  }

  showEditDialog(): void
  {
    const effectsContainer = new EffectsContainerBase();

    effectsContainer.withContainer(() =>
    {
      const form = this._formFactory.create<ToDo>({
        submit: async formData =>
        {
          this.title = formData.title;
          this.description = formData.description;
          this.completionDatePlanned = formData.completionDatePlanned;

          await this.saveAsync();
        }
      });

      form.setElements({
        title: {
          type: FormElementType.inputText,
          label: 'Название задачи',
          placeholder: 'Введите название задачи',
        },

        description: {
          type: FormElementType.textarea,
          label: 'Описание задачи',
          placeholder: 'Введите описание задачи'
        },

        completionDatePlanned: {
          type: FormElementType.inputDateTime,
          label: 'Плановая дата выполнения',
        }
      });

      form.setData(this);

      const modal = this._overlayService.createModalEditForm(form);
      modal.title = 'Редактирование';
      modal.content = form;

      modal.onClose.subscribe(() =>
      {
        effectsContainer.destroy();
      });
    });
  }
}