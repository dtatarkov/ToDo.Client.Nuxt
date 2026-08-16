import type { FormConfiguration } from '../configuration/formConfiguration';
import type { FormHandlers } from '../types/formHandlers';
import type { FormViewmodel } from '../viewmodels/formViewmodel';

export abstract class FormViewmodelFactory
{
    abstract create<TEntity extends Record<string, any> = Record<string, any>>(
        configuration: FormConfiguration<TEntity>,
        handlers: FormHandlers<TEntity>
    ): FormViewmodel<TEntity>;
}