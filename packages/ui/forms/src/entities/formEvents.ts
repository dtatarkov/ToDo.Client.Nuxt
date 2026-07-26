import { EntityEvent } from '@client/shared';
import type { FormValidationError } from '../entities/formValidationError';

export class FormEvents
{
    formValidationErrorEvent = new EntityEvent<FormValidationError>();
}
