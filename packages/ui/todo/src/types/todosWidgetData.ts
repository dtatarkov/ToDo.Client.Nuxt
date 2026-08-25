import type { ButtonGeneralData } from '@client/ui-uikit';
import type { ToDoCardData } from './todoCardData';

export type ToDosWidgetData = {
    cards: ToDoCardData[];
    addToDoButton: ButtonGeneralData;
};
