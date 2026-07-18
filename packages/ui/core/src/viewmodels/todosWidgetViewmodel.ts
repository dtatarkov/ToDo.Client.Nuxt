import type { ToDoCardData } from '../types/todoCardData';
import { Viewmodel } from './viewmodel';

export type ToDosWidgetViewmodelState = {
    cards: ToDoCardData[];
};

export abstract class ToDosWidgetViewmodel extends Viewmodel<ToDosWidgetViewmodelState> implements Disposable
{
    abstract createToDo(): void;
    abstract editToDo(id: string): void;
    abstract initializeAsync(): Promise<void>;
    abstract [Symbol.dispose](): void;
}

