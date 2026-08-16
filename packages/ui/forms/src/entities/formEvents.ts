import type { FormValidationError } from '../entities/formValidationError';
import type { IEntityEvent } from '@client/shared';

export abstract class FormEvents implements Disposable
{
    abstract formValidationErrorEvent: IEntityEvent<FormValidationError>;

    abstract [Symbol.dispose](): void;
}
