import { ToDoStateBase } from './todoStateBase';
import type { ToDoData } from '../types/todoData';
import type { ToDoBase } from './todoBase';
import type { Modal } from '@/modules/overlay/entities/modal';
import type { FormFactory } from '@/modules/forms/factories/formFactory';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

export class ToDoStateSaved extends ToDoStateBase
{
    constructor(
        private overlay: Overlay,
        private formFactory: FormFactory,
        todo: ToDoBase,
    )
    {
        super(todo);
    }

    showForm(): Modal
    {
        const form = this.formFactory.create<ToDoData>({
            submit: async data =>
            {
                updatePropertiesWithData(this.todo, data);
                await this.todo.saveAsync();
            }
        });

        form.setElementsFromScheme(this.scheme);
        form.setData(this.todo.getData());

        return this.overlay.createModal({
            title: 'Изменить задачу',
            content: form,

            buttonConfirm: configurator => configurator
                .withCommand(form.getSubmitCommand())
                .asEditButton(),

            buttonCancel: true,
        });
    }
}