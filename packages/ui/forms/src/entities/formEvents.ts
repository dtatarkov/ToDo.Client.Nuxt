import type { FormValidationMessages } from '../types/formValidationMessages';
import type { IEntityEvent } from '@client/shared';

export abstract class FormEvents<TEntity extends Record<string, any> = Record<string, any>> implements Disposable
{
    abstract formValidationErrorEvent: IEntityEvent<FormValidationMessages<TEntity>>;

    abstract [Symbol.dispose](): void;
}
