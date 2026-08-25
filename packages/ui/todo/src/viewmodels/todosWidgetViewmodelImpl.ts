import { InitializationToken } from '@client/shared';
import { ToDosWidgetViewmodel } from './todosWidgetViewmodel';
import type { ToDosWidgetData } from '../types/todosWidgetData';
import { ToDosStore, type ToDo } from '@client/domain-todo';
import { dependency } from '@client/infrastructure-di';
import { UIKitViewmodelsFactory, type ButtonGeneralViewmodel } from '@client/ui-uikit';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import type { ToDoCardData } from '../types/todoCardData';

@dependency(ToDosStore)
@dependency(UIKitViewmodelsFactory)
export class ToDosWidgetViewmodelImpl extends ViewmodelBase<ToDosWidgetData> implements ToDosWidgetViewmodel
{
    private initializationToken = new InitializationToken();
    private readonly addToDoButtonViewmodel: ButtonGeneralViewmodel;

    state: ObservableViewmodelStateBase<ToDosWidgetData>;

    constructor(
        private todosStore: ToDosStore,
        uiKitViewmodelsFactory: UIKitViewmodelsFactory,
    )
    {
        super();

        this.addToDoButtonViewmodel = this.createAddToDoButton(uiKitViewmodelsFactory);
        this.disposeToken.registerDisposable(this.addToDoButtonViewmodel);

        this.state = new ObservableViewmodelStateBase<ToDosWidgetData>({
            cards: [],
            addToDoButton: this.addToDoButtonViewmodel.state.value,
        });

        this.addToDoButtonViewmodel.state.on(() => this.updateAddToDoButtonState(), this.disposeToken);

        this.todosStore.todos.on(todos =>
        {
            this.updateCardsState(todos);
        }, this.disposeToken);
    }

    createToDo(): void
    {
        console.log('createToDo');
    }

    editToDo(id: string): void
    {
        console.log('editToDo:id', id);
    }

    async initializeAsync()
    {
        if (this.initializationToken.isInitialized)
        {
            return;
        }

        this.initializationToken.initialize();
        this.updateCardsState(this.todosStore.todos.value);

        await this.todosStore.initializeToDosAsync();
    }

    private createAddToDoButton(factory: UIKitViewmodelsFactory): ButtonGeneralViewmodel
    {
        const button = factory.createButtonGeneral();
        button.setTitle('todos.toolbar.buttons.add');

        return button;
    }

    private updateAddToDoButtonState()
    {
        this.state.update({ addToDoButton: this.addToDoButtonViewmodel.state.value });
    }

    private updateCardsState(todos: ToDo[])
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