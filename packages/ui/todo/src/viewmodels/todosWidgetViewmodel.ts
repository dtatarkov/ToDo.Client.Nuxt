import { Viewmodel } from '@client/ui-core';
import type { ToDosWidgetData } from '../types/todosWidgetData';

export abstract class ToDosWidgetViewmodel extends Viewmodel<ToDosWidgetData>
{
    abstract createToDo(): void;
    abstract editToDo(id: string): void;
    abstract initializeAsync(): Promise<void>;
}