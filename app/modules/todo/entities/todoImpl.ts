import { ToDo, type ToDoData } from "../interfaces/todo";
import type { ToDosOwner } from '../interfaces/todosOwner';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { Observable } from '@/modules/shared/interfaces/observable';
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
    const todo = new ToDoImpl(this.stringsService);

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

  private updateData(modifiedDataPart: Partial<ToDoData>)
  {
    const newData = { ...this.dataInternal.value, ...modifiedDataPart };
    Object.freeze(newData);

    this.dataInternal.value = newData;
  }
}