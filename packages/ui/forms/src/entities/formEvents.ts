import { EntityEvent } from '@client/shared';
import type { FormValidationError } from '../entities/formValidationError';
import type { IEntityEvent } from '@client/shared';

export interface IFormEvents
{
    formValidationErrorEvent: IEntityEvent<FormValidationError>;
}

export class FormEvents implements IFormEvents
{
    formValidationErrorEvent = new EntityEvent<FormValidationError>();
}
