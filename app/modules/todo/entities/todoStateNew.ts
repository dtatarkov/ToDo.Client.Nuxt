import { ToDoStateBase } from './todoStateBase';
import type { ToDoData } from '../types/todoData';
import type { ToDoBase } from './todoBase';
import type { Modal } from '@/modules/overlay/entities/modal';
import type { FormFactory } from '@/modules/forms/factories/formFactory';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Form } from '@/modules/forms/entities/form';
import type { MessagesService } from '@/modules/shared/services/messagesService';

export class ToDoStateNew extends ToDoStateBase
{
    constructor(
        private overlay: Overlay,
        private formFactory: FormFactory,
        messagesService: MessagesService,
        todo: ToDoBase,
    )
    {
        super(todo, messagesService);
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

        form.onValidationError(error =>
        {
            this.overlay.createNotification({
                title: this.messagesService.getMessage('todo.notification.createError.title'),
                description: error.toString(),
                icon: 'i-heroicons-exclamation-triangle',
                color: 'error'
            });
        });

        return this.overlay.createModal({
            title: this.messagesService.getMessage('todo.modal.create.title'),
            content: form,

            buttonConfirm: configurator => configurator
                .withCommand(form.getSubmitCommand())
                .asCreateButton(),

            buttonCancel: true,
        });
    }
}
