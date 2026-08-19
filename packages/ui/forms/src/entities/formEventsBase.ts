import { EntityEvent } from '@client/shared';
import { FormEvents } from './formEvents';
import type { FormValidationMessages } from '../types/formValidationMessages';


export class FormEventsBase<TEntity extends Record<string, any> = Record<string, any>> extends FormEvents<TEntity>
{
    formValidationErrorEvent = new EntityEvent<FormValidationMessages<TEntity>>();

    override[Symbol.dispose](): void
    {
        this.formValidationErrorEvent[Symbol.dispose]();
    }
}