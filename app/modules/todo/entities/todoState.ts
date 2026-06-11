import type { Modal } from '@/modules/overlay/entities/modal';

export abstract class ToDoState
{
    abstract showForm(): Modal;
}