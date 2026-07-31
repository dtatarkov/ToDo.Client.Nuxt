import type { MessageKey } from '@client/infrastructure-messages';
import { Viewmodel } from '@client/ui-core';
import type { ToDoCardData } from '../types/todoCardData';

export type ToDosWidgetViewmodelState = {
    cards: ToDoCardData[];
};

export abstract class ToDosWidgetViewmodel extends Viewmodel<ToDosWidgetViewmodelState>
{
    abstract readonly addToDoButtonLabelKey: MessageKey;

    abstract createToDo(): void;
    abstract editToDo(id: string): void;
    abstract initializeAsync(): Promise<void>;
}

