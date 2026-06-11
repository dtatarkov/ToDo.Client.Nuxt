import type { Reactive } from 'vue';
import type { ToDosOwner } from './todosOwner';
import type { ToDoData } from '../types/todoData';
import type { Modal } from '@/modules/overlay/entities/modal';

export abstract class ToDo
{
  abstract id: string;
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: Date | undefined;
  abstract completionDateActual: Date | undefined;
  abstract owner: ToDosOwner | undefined;

  abstract get isNew(): boolean;
  abstract getData(): Reactive<ToDoData>;
  abstract setData(data: Partial<ToDoData>): ToDo;
  abstract clone(): ToDo;
  abstract saveAsync(): Promise<void>;
  abstract showForm(): Modal;
}