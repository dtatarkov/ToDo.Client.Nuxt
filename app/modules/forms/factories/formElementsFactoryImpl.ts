import type { FormElement } from '../entities/formElement';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import { InputElementsFactory } from './inputElementsFactory';
import { FormElementBase } from '../entities/formElementBase';
import { FormFieldBase } from '../entities/formFieldBase';
import type { FormElementsFactory } from './formElementsFactory';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import type { EntityFieldScheme, EntityStringFieldScheme } from '@/modules/shared/types/entityFieldScheme';
import { EntityValidatorFactory } from '@/modules/validation/factories/entityValidatorFactory';
import type { EntityValidator } from '@/modules/validation/entities/entityValidator';

@dependency(InputElementsFactory)
@dependency(EntityValidatorFactory)
export class FormElementsFactoryImpl implements FormElementsFactory
{
    constructor(
        private inputElementsFactory: InputElementsFactory,
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
        const inputElement = this.createFieldInputElement(name, fieldScheme);

        if (!inputElement)
        {
            return undefined;
        }

        const formField = this.createFormField(name, fieldScheme);
        const formElement = new FormElementBase(inputElement, formField, validator);

        return formElement;
    }

    private createFormField(name: string, fieldScheme: EntityFieldScheme)
    {
        const formField = new FormFieldBase();
        formField.name = name;
        formField.label = (fieldScheme as { label?: string; }).label ?? '';

        return formField;
    }

    private createFieldInputElement(name: string, fieldScheme: EntityFieldScheme): InputElement | undefined
    {
        let inputElement: InputElement | undefined = undefined;

        switch (fieldScheme.type)
        {
            case EntityFieldType.string:
                inputElement = this.createStringFieldInputElement(fieldScheme);
                break;

            case EntityFieldType.datetime:
                inputElement = this.createInputDateTime();
                break;
        }

        if (inputElement)
        {
            inputElement.name = name;
        }

        return inputElement;
    }

    private createStringFieldInputElement(fieldScheme: EntityStringFieldScheme): InputElement
    {
        return fieldScheme.isLong
            ? this.createTextarea(fieldScheme)
            : this.createInputText(fieldScheme);
    }

    private createInputText(fieldScheme: EntityStringFieldScheme): InputElement
    {
        const inputElement = this.inputElementsFactory.createInputText();

        if (fieldScheme.placeholder)
        {
            inputElement.placeholder = fieldScheme.placeholder;
        }

        return inputElement;
    }

    private createTextarea(fieldScheme: EntityStringFieldScheme): InputElement
    {
        const inputElement = this.inputElementsFactory.createTextarea();

        if (fieldScheme.placeholder)
        {
            inputElement.placeholder = fieldScheme.placeholder;
        }

        return inputElement;
    }

    private createInputDateTime(): InputElement
    {
        const inputElement = this.inputElementsFactory.createInputDateTime();

        return inputElement;
    }
}
