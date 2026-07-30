import type { FormValidationError } from '../entities/formValidationError';
import type { IEntityEvent } from '@client/shared';

export abstract class FormEvents
{
    abstract formValidationErrorEvent: IEntityEvent<FormValidationError>;
}
