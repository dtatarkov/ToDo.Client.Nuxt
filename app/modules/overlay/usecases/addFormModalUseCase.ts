import type { ModalConfirm } from '../entities/modalConfirm';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export abstract class AddFormModalUseCase
{
    abstract execute(form: FormViewmodel): ModalConfirm<FormViewmodel>;
}