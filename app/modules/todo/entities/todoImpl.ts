import { ToDo, type ToDoData } from "../interfaces/todo";
import type { ToDosOwner } from '../interfaces/todosOwner';
import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import { shallowReactive } from 'vue';

export class ToDoImpl extends ToDo
{
  private ownerInternal: ToDosOwner | undefined;

  private dataInternal = shallowReactive(Object.seal(<ToDoData>{
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
    return this.stringsService.isStringEmpty(this.id);
  }

  override getData(): ToDoData
  {
    return this.dataInternal;
  }

  override clone(): ToDo
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

  override async saveAsync(): Promise<void> 
  {
    if (!this.owner)
    {
      throw new Error('Owner is not available');
    }

    await this.ownerInternal?.saveToDoAsync(this);
  }
}