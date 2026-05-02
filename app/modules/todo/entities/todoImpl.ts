import { ToDo, type ToDoData } from "../interfaces/todo";
import type { ToDosOwner } from '../interfaces/todosOwner';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import type { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';

export class ToDoImpl extends ToDo
{
  private ownerInternal: ToDosOwner | undefined;

  private dataInternal = new ObservableSource<ToDoData>(Object.freeze({
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  }));

  constructor(
    private formFactory: FormViewmodelFactory,
    private overlayService: OverlayService,
    private stringsService: StringsService,
  )
  {
    super();
  }

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
    return this.dataInternal.value.id;
  }

  get title(): string
  {
    return this.dataInternal.value.title;
  }

  get description(): string
  {
    return this.dataInternal.value.description;
  }

  get completionDatePlanned(): Date | undefined
  {
    return this.dataInternal.value.completionDatePlanned;
  }

  get completionDateActual(): Date | undefined
  {
    return this.dataInternal.value.completionDateActual;
  }

  set id(value: string)
  {
    this.updateData({ id: value });
  }

  set title(value: string)
  {
    this.updateData({ title: value });
  }

  set description(value: string)
  {
    this.updateData({ description: value });
  }

  set completionDatePlanned(value: Date | undefined)
  {
    this.updateData({ completionDatePlanned: value });
  }

  set completionDateActual(value: Date | undefined)
  {
    this.updateData({ completionDateActual: value });
  }

  get isNew()
  {
    return this.stringsService.isStringEmpty(this.id);
  }

  getData(): ToDoData
  {
    return this.dataInternal.value;
  }

  toObservableData(): Observable<ToDoData>
  {
    return this.dataInternal;
  }

  clone(): ToDo
  {
    const todo = new ToDoImpl(this.formFactory, this.overlayService, this.stringsService);

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

    await this.ownerInternal?.saveToDoAsync(this);
  }

  showEditDialog(): void
  {
    const form = this.formFactory.create<ToDo>({
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

    const modal = this.overlayService.createEditFormModal(form);
    modal.title = 'Редактирование';
  }

  private updateData(modifiedDataPart: Partial<ToDoData>)
  {
    const newData = { ...this.dataInternal.value, ...modifiedDataPart };
    Object.freeze(newData);

    this.dataInternal.value = newData;
  }
}