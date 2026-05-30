import type { Reactive } from 'vue';
import type { ToDosOwner } from './todosOwner';
import type { ToDoData } from '../types/todoData';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';

export abstract class ToDo
{
  abstract id: string;
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: Date | undefined;
  abstract completionDateActual: Date | undefined;
  abstract owner: ToDosOwner | undefined;

  abstract get isNew(): boolean;

  abstract getAddScheme(): EntityScheme<ToDoData>;
  abstract getEditScheme(): EntityScheme<ToDoData>;
  abstract getData(): Reactive<ToDoData>;
  abstract clone(): ToDo;
  abstract saveAsync(): Promise<void>;
}