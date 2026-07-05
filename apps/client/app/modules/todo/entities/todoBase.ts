import { ToDo } from "./todo";
import type { ToDoData } from '../types/todoData';
import type { ToDosOwner } from './todosOwner';
import { shallowReactive, type Reactive } from 'vue';
import { isStringEmpty, satisfies , updatePropertiesWithData  } from '@packages/shared';
import type { FormFactory } from '@/modules/forms/factories/formFactory';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Modal } from '@/modules/overlay/entities/modal';
import { ToDoStateNew } from './todoStateNew';
import { ToDoStateSaved } from './todoStateSaved';

import type { ToDoState } from './todoState';
import type { StateTransition, MessagesService  } from '@packages/shared';

import type { Form } from '@/modules/forms/entities/form';

import type { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';

type ToDoStateTransitionConstraint = {
  isNew: boolean;
};

export class ToDoBase extends ToDo
{
  private ownerInternal: ToDosOwner | undefined;
  private newState: ToDoStateNew;
  private savedState: ToDoStateSaved;
  private state: ToDoState;
  private transitions: Array<StateTransition<ToDoState, ToDoStateTransitionConstraint>>;

  private dataInternal = shallowReactive(<ToDoData>{
    id: '',
    title: '',
    description: '',
    completionDatePlanned: undefined,
    completionDateActual: undefined
  });

  constructor(
    private overlay: Overlay,
    private notificationsStore: AppNotificationsStore,
    private formFactory: FormFactory,
    private messagesService: MessagesService,
  )
  {
    super();

    this.newState = new ToDoStateNew(this.overlay, this.notificationsStore, this.formFactory, this.messagesService, this);
    this.savedState = new ToDoStateSaved(this.overlay, this.notificationsStore, this.formFactory, this.messagesService, this);

    this.state = this.newState;

    this.transitions = [
      { from: this.newState, to: this.savedState, constraint: { isNew: false } },
      { from: this.savedState, to: this.newState, constraint: { isNew: true } },
    ];
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
    this.updateState();
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

  private updateState(): void
  {
    const transition = this.transitions.find(t =>
      t.from === this.state && satisfies(this, t.constraint)
    );

    if (transition)
    {
      this.state = transition.to;
    }
  }

  override getData(): Reactive<ToDoData>
  {
    return this.dataInternal;
  }

  override setData(data: Partial<ToDoData>)
  {
    updatePropertiesWithData(this.dataInternal, data);
    this.updateState();

    return this;
  }

  override clone(): ToDo
  {
    const todo = new ToDoBase(this.overlay, this.notificationsStore, this.formFactory, this.messagesService);

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

  override showForm(): Modal<Form>
  {
    return this.state.showForm();
  }
}