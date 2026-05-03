import { ToDosWidgetViewmodel } from "../interfaces/todosWidgetViewmodel";
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { h } from 'vue';
import VToDosWidget from '@/modules/todo/widgets/VToDosWidget.vue';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';

export class ToDosWidgetViewmodelImpl extends ToDosWidgetViewmodel
{
  readonly key = getUniqueId('todos-widget');

  override component = {
    setup: () =>
    {
      const initialize = () => this.initialize();
      const handleAddToDo = () => this.addToDo();
      const handleEditToDo = (card: ToDoCardDataWithIdentity) => this.editToDo(card.id);

      return () => h(VToDosWidget, {
        cards: this.cards,

        initialize,
        onAddToDo: handleAddToDo,
        onEditToDo: handleEditToDo
      });
    }
  };

  cards: ToDoCardDataWithIdentity[] = [];

  async initialize(): Promise<void>
  {
    // Implementation for initialization logic
    console.log('ToDosWidgetViewmodelImpl initialized');
  }

  addToDo(): void
  {
    // Implementation for adding a new todo
    console.log('Adding new todo');
  }

  editToDo(id: string): void
  {
    // Implementation for editing a todo with the given id
    console.log(`Editing todo with id: ${id}`);
  }
}