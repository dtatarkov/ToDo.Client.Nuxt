import { DisposeToken, InitializationToken, ObservableWritableBase } from '@client/shared';
import { ToDosWidgetViewmodel, type ToDosWidgetViewmodelState } from './todosWidgetViewmodel';
import { ToDosStore, type ToDo } from '@client/domain-todo';
import { dependency } from '@client/infrastructure-di';
import type { ToDoCardData } from '../types/todoCardData';

@dependency(ToDosStore)
export class ToDosWidgetViewmodelImpl extends ToDosWidgetViewmodel
{
    private disposeToken = new DisposeToken();
    private initializationToken = new InitializationToken();

    readonly addToDoButtonLabelKey = 'todos.toolbar.buttons.add';

    state = new ObservableWritableBase<ToDosWidgetViewmodelState>({
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

    [Symbol.dispose]()
    {
        this.disposeToken[Symbol.dispose]();
    }

    private updateCards(todos: ToDo[])
    {
        this.state.value = {
            ...this.state.value,

            cards: todos.map(todo => <ToDoCardData>{
                id: todo.id,
                title: todo.title,
                description: todo.description,
                completionDateActual: todo.completionDateActual,
                completionDatePlanned: todo.completionDatePlanned,
            })
        };
    }
}