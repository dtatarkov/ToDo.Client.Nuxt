import type { FormElement } from '../entities/formElement';
import { FormElementType } from '../enums/formElementType';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import { InputElementsFactory } from './inputElementsFactory';
import { FormElementBase } from '../entities/formElementBase';
import type { FormElementsFactory } from './formElementsFactory';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import type { EntityDateTimeFieldScheme, EntityFieldScheme, EntityStringFieldScheme } from '@/modules/shared/types/entityFieldScheme';
import { EntityValidatorFactory } from '@/modules/validation/factories/entityValidatorFactory';
import type { EntityValidator } from '@/modules/validation/entities/entityValidator';
import type { FormElementCreateData } from '../types/formElementCreateData';

@dependency(InputElementsFactory)
@dependency(EntityValidatorFactory)
export class FormElementsFactoryImpl implements FormElementsFactory
{
    constructor(
        protected inputElementsFactory: InputElementsFactory,
        private entityValidatorFactory: EntityValidatorFactory,
    )
    {
    }

    createElements<TEntity extends Record<string, any>>(
        scheme: EntityScheme<TEntity>
    ): FormElement[]
    {
        const validator = this.entityValidatorFactory.getValidator(scheme);
        const elements: FormElement[] = [];

        for (const [key, fieldScheme] of Object.entries(scheme))
        {
            const element = this.createFormElement(key, fieldScheme, validator);

            if (element)
            {
                elements.push(element);
            }
        }

        return elements;
    }

    private createFormElement<TEntity extends Record<string, any>>(
        name: string,
        fieldScheme: EntityFieldScheme,
        validator: EntityValidator<TEntity>,
    ): FormElement | undefined
    {
        const createData = this.mapSchemeFieldIntoElementCreateData(fieldScheme);

        if (!createData)
        {
            return undefined;
        }

        const inputElement = this.createInputElement(createData.type);
        const formElement = new FormElementBase(inputElement);

        formElement.setData({
            ...createData,
            name,
            validate: (value: any) =>
                validator.validateField(name as keyof TEntity, value),
        });

        return formElement;
    }

    private mapSchemeFieldIntoElementCreateData(fieldScheme: EntityFieldScheme): FormElementCreateData | undefined
    {
        switch (fieldScheme.type)
        {
            case EntityFieldType.string:
                return this.mapStringField(fieldScheme);

            case EntityFieldType.datetime:
                return this.mapDateTimeField(fieldScheme);

            default:
                return undefined;
        }
    }

    private mapStringField(fieldScheme: EntityStringFieldScheme): FormElementCreateData
    {
        if (fieldScheme.isLong)
        {
            return {
                type: FormElementType.textarea,
                label: fieldScheme.label,
                placeholder: fieldScheme.placeholder,
            };
        }

        return {
            type: FormElementType.inputText,
            label: fieldScheme.label,
            placeholder: fieldScheme.placeholder,
        };
    }

    private mapDateTimeField(fieldScheme: EntityDateTimeFieldScheme): FormElementCreateData
    {
        return {
            type: FormElementType.inputDateTime,
            label: fieldScheme.label,
        };
    }

    private createInputElement(type: FormElementType): InputElement
    {
        switch (type)
        {
            case FormElementType.inputText:
                return this.inputElementsFactory.createInputText();
            case FormElementType.textarea:
                return this.inputElementsFactory.createTextarea();
            case FormElementType.inputDate:
                return this.inputElementsFactory.createInputDate();
            case FormElementType.inputTime:
                return this.inputElementsFactory.createInputTime();
            case FormElementType.inputDateTime:
                return this.inputElementsFactory.createInputDateTime();
        }
    }
}
