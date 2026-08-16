import { InitializationToken } from '@client/shared';
import { ToDosWidgetViewmodel, type ToDosWidgetViewmodelState } from './todosWidgetViewmodel';
import { ToDosStore, type ToDo } from '@client/domain-todo';
import { dependency } from '@client/infrastructure-di';
import type { ToDoCardData } from '../../../todo/src/types/todoCardData';
import type { MessageKey } from '@client/infrastructure-messages';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';

@dependency(ToDosStore)
export class ToDosWidgetViewmodelImpl extends ViewmodelBase<ToDosWidgetViewmodelState> implements ToDosWidgetViewmodel
{
    private initializationToken = new InitializationToken();

    readonly addToDoButtonLabelKey: MessageKey = 'todos.toolbar.buttons.add';

    state = new ObservableViewmodelStateBase<ToDosWidgetViewmodelState>({
        cards: []
    });

    constructor(
        private todosStore: ToDosStore
    )
    {
        super();
    }

    createToDo(): void
    {
        console.log('createToDo');

        // const todo = todosOwner.createToDo();
        // todo.showForm();
    }

    editToDo(id: string): void
    {
        console.log('editToDo:id', id);

        // const todo = await todosOwner.getToDoByIdAsync(id);

        // if (todo)
        // {
        //     todo.showForm();
        // }
    }

    async initializeAsync()
    {
        if (this.initializationToken.isInitialized)
        {
            return;
        }

        this.initializationToken.initialize();
        this.updateCards(this.todosStore.todos.value);

        this.todosStore.todos.on(todos =>
        {
            this.updateCards(todos);
        }, this.disposeToken);

        await this.todosStore.initializeToDosAsync();
    }

    override[Symbol.dispose]()
    {
        super[Symbol.dispose]();

        this.disposeToken[Symbol.dispose]();
    }

    private updateCards(todos: ToDo[])
    {
        const cards = this.createToDoCardsData(todos);

        this.state.update({ cards });
    }

    private createToDoCardsData(todos: ToDo[]): ToDoCardData[]
    {
        const data = todos.map(todo => <ToDoCardData>{
            id: todo.id,
            title: todo.title,
            description: todo.description,
            completionDateActual: todo.completionDateActual,
            completionDatePlanned: todo.completionDatePlanned,
        });

        return data;
    }
}