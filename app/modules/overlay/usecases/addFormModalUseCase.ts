import type { Modal } from '../entities/modal';
import type { Form } from '@/modules/forms/entities/form';

export abstract class AddFormModalUseCase
{
    abstract execute(form: Form): Modal<Form>;
}