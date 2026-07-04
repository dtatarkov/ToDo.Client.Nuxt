import type { Form } from '@/modules/forms/entities/form';
import type { Modal } from '@/modules/overlay/entities/modal';

export abstract class ToDoState
{
    abstract showForm(): Modal<Form>;
}