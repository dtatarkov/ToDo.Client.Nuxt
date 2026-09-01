import { ToDosWidgetViewmodel } from './todosWidgetViewmodel';
import type { ToDosWidgetData } from '../types/todosWidgetData';
import { ToDosStore, type ToDoAddData, type ToDoUpdateData, ToDoNotFoundException, type ToDoData } from '@client/domain-todo';
import { dependency } from '@client/infrastructure-di';
import { UIKitViewmodelsFactory, type ButtonGeneralViewmodel } from '@client/ui-uikit';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import { createToDoAddFormConfiguration, createToDoUpdateFormConfiguration } from '../configuration/todoFormConfiguration';
import { FormViewmodelFactory } from '@client/ui-forms';
import { Overlay } from '@client/ui-overlay';
import { ToDoToCardMapper } from '../mappers/todoToCardMapper';

@dependency(ToDosStore)
@dependency(UIKitViewmodelsFactory)
@dependency(FormViewmodelFactory)
@dependency(Overlay)
@dependency(ToDoToCardMapper)
export class ToDosWidgetViewmodelImpl extends ViewmodelBase<ToDosWidgetData> implements ToDosWidgetViewmodel
{
    private readonly addToDoButtonViewmodel: ButtonGeneralViewmodel;

    state: ObservableViewmodelStateBase<ToDosWidgetData>;

    constructor(
        private todosStore: ToDosStore,
        uiKitViewmodelsFactory: UIKitViewmodelsFactory,
        private formViewmodelFactory: FormViewmodelFactory,
        private overlay: Overlay,
        private todoToCardMapper: ToDoToCardMapper,
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
        const scheme = this.todosStore.getAddScheme();
        const formConfig = createToDoAddFormConfiguration(scheme);

        const formViewmodel = this.formViewmodelFactory.create(formConfig, {
            submit: async (data: Record<keyof ToDoAddData, any>) =>
            {
                await this.todosStore.addToDoAsync(data as ToDoAddData);
            },
        });

        this.overlay.createModal({
            title: 'Create ToDo',
            content: formViewmodel,

            buttonConfirm: configurator => configurator
                .withCommand(formViewmodel.getSubmitCommand())
                .asCreateButton(),

            buttonCancel: true,
        });
    }

    async editToDoAsync(id: string): Promise<void>
    {
        const todoData = await this.todosStore.getToDoByIdAsync(id);
        const scheme = await this.todosStore.getUpdateSchemeAsync(id);

        if (!todoData || !scheme)
        {
            throw new ToDoNotFoundException(id);
        }

        const formConfig = createToDoUpdateFormConfiguration(scheme);

        const formViewmodel = this.formViewmodelFactory.create(formConfig, {
            submit: async (data: Record<keyof ToDoUpdateData, any>) =>
            {
                await this.todosStore.updateToDoAsync(data as ToDoUpdateData);
            },
        });

        formViewmodel.setData(todoData);

        this.overlay.createModal({
            title: 'Edit ToDo',
            content: formViewmodel,

            buttonConfirm: configurator => configurator
                .withCommand(formViewmodel.getSubmitCommand())
                .asEditButton(),

            buttonCancel: true,
        });
    }

    async initializeAsync()
    {
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

    private updateCardsState(todos: ToDoData[])
    {
        const cards = todos.map(todo =>
            this.todoToCardMapper.map(todo));

        this.state.update({ cards });
    }
}