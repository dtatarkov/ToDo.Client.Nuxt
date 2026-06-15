import { ToDoStateBase } from './todoStateBase';
import type { ToDoData } from '../types/todoData';
import type { ToDoBase } from './todoBase';
import type { Modal } from '@/modules/overlay/entities/modal';
import type { FormFactory } from '@/modules/forms/factories/formFactory';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Form } from '@/modules/forms/entities/form';

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

    showForm(): Modal<Form>
    {
        const form = this.formFactory.create<ToDoData>({
            scheme: this.scheme,

            submit: data => this.todo
                .setData(data)
                .saveAsync()
        });

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