import type { ToDoData } from '../types/todoData';
import type { ToDoAddData } from '../types/todoAddData';
import type { ToDoUpdateData } from '../types/todoUpdateData';
import { EntityScheme } from '@client/infrastructure-entity-schemes';

export abstract class ToDo
{
  abstract id: string;
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: Date | undefined;
  abstract completionDateActual: Date | undefined;

  abstract getData(): ToDoData;
  abstract setData(data: Partial<ToDoData>): void;
  abstract clone(): ToDo;

  static getAddScheme(): EntityScheme<any, ToDoAddData>
  {
    return EntityScheme.create(scheme => ({
      title: scheme.string().required('todo.field.title.errors.empty'),
      description: scheme.string().withDefault(''),
      completionDatePlanned: scheme.datetime(),
    }));
  }

  abstract getUpdateScheme(): EntityScheme<any, ToDoUpdateData>;
}