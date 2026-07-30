import { EntityEvent } from '@client/shared';
import { FormEvents } from './formEvents';
import type { FormValidationError } from './formValidationError';


export class FormEventsBase extends FormEvents
{
    formValidationErrorEvent = new EntityEvent<FormValidationError>();
}