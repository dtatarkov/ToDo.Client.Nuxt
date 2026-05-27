import type { ModalConfirm } from '../entities/modalConfirm';
import type { Form } from '@/modules/forms/entities/form';

export abstract class AddFormModalUseCase
{
    abstract execute(form: Form): ModalConfirm<Form>;
}